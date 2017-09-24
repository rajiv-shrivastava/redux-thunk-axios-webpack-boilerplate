import jws from 'jws'

const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export default function (window) {
  return createCredentials(ensureStorage(window))
}

function createCredentials ({ sessionStorage, localStorage }) {
  const sessionToken = decodeJwtToken(sessionStorage.getItem(TOKEN_KEY))
  const refreshToken = decodeRefreshToken(localStorage.getItem(REFRESH_TOKEN_KEY))
  return {
    sessionToken: sessionToken.valid ? sessionToken.encoded : null,
    refreshToken: refreshToken.valid ? refreshToken.value : null,
    valid: (now) => {
      return sessionToken.valid && !(now > renewTime(sessionToken))
    },
    canRenew: (now) => {
      return sessionToken.valid && (now > renewTime(sessionToken)) && !(now >= rejectTime(sessionToken))
    },
    expired: (now) => {
      return sessionToken.valid && (now >= rejectTime(sessionToken))
    },
    milestones: () => ({
      renewTime: new Date(renewTime(sessionToken)),
      rejectTime: new Date(rejectTime(sessionToken)),
      expirationTime: new Date(expirationTime(sessionToken))
    }),
    withSessionToken: (newToken) => {
      const signinToken = decodeJwtToken(newToken)
      if (signinToken.valid) {
        sessionStorage.setItem(TOKEN_KEY, newToken)
        if (refreshToken.valid && refreshToken.email !== signinToken.email) {
          localStorage.removeItem(REFRESH_TOKEN_KEY)
        }
      }
      return createCredentials({ sessionStorage, localStorage })
    },
    withRefreshToken: (token) => {
      localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify({ email: sessionToken.email, value: token }))
      return createCredentials({ sessionStorage, localStorage })
    },
    withoutSessionToken: () => {
      sessionStorage.removeItem(TOKEN_KEY)
      return createCredentials({ sessionStorage, localStorage })
    },
    cleared: () => {
      sessionStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      return createCredentials({ sessionStorage, localStorage })
    }
  }
}

const ensureStorage = (window) => {
  const sessionStorage = isLocalStorageAvailable(window.sessionStorage) ? window.sessionStorage : memoryStorage()
  const localStorage = isLocalStorageAvailable(window.localStorage) ? window.localStorage : memoryStorage()
  return { sessionStorage, localStorage }
}

// Need to account for time diff with the server, otherwise client may think the token is valid, and server refuse it
const EXPIRATION_SAFETY_DURATION = 2 * 60 // 2 min should be enough
const RENEW_PERIOD_DURATION = 10 * 60 // 10 min should be enough

const expirationTime = (decodedToken) => {
  return decodedToken.exp * 1000
}

const rejectTime = (decodedToken) => {
  return expirationTime(decodedToken) - EXPIRATION_SAFETY_DURATION * 1000
}

const renewTime = (decodedToken) => {
  return rejectTime(decodedToken) - RENEW_PERIOD_DURATION * 1000
}

const decodeJwtToken = (token) => {
  if (!token || !token.length) return { valid: false, error: 'Empty token' }
  const decoded = jws.decode(token)
  if (!decoded) return { valid: false, error: 'Invalid token' }
  return {
    valid: true,
    email: decoded.payload.sub,
    exp: decoded.payload.exp,
    encoded: token
  }
}

function decodeRefreshToken (blob) {
  const invalid = {
    valid: false,
    error: 'Invalid refresh token'
  }
  if (!blob) return invalid
  try {
    const token = JSON.parse(blob)
    if (token.email && token.value) {
      return {
        valid: true,
        email: token.email,
        value: token.value
      }
    } else {
      return invalid
    }
  } catch (e) {
    return {
      valid: false,
      error: 'Invalid refresh token ' + e.toString()
    }
  }
}

function isLocalStorageAvailable (storage) {
  if (storage && typeof storage.setItem === 'function') {
    try {
      storage.setItem('test-key', 'test-value')
      storage.removeItem('test-key')
      return true
    } catch (error) {
      if (error.name === 'SecurityError') {
        // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
        // attempt to access window.sessionStorage.
        return false
      }

      if (error.name === 'QuotaExceededError' && storage.length === 0) {
        // Safari "private mode" throws QuotaExceededError.
        return false
      }
      return false // really, if any error happens, just return false so app works with memoryTokenStorage
    }
  } else {
    return false
  }
}

function memoryStorage () {
  var map = {}
  return {
    setItem: (key, data) => {
      map[key] = data
    },
    getItem: (key) => {
      return map[key]
    },
    removeItem: (key) => {
      return map[key]
    }
  }
}
