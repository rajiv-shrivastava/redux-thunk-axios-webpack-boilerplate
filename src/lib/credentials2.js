import jws from 'jws'
import StateMachine from './StateMachine'

const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export default function (window, refresher = () => Promise.reject(new Error('Can not refresh'))) {
  const { sessionStorage, localStorage } = ensureStorage(window)

  const sessionToken = decodeJwtToken(sessionStorage.getItem(TOKEN_KEY))
  const refreshToken = decodeRefreshToken(localStorage.getItem(REFRESH_TOKEN_KEY))

  return StateMachine((state = { sessionToken, refreshToken }, transition) => ({
    getValidToken: (now = Date.now()) => {
      if (sessionToken.valid && !needsRenewal(sessionToken, now) && !expired(sessionToken, now)) {
        return Promise.resolve(sessionToken.encoded)
      } else if (sessionToken.valid && needsRenewal(sessionToken, now) && !expired(sessionStorage, now)) {
        return refresher({sessionToken: sessionToken.encoded, refreshToken: refreshToken.value})
          .then(newToken => {
            const tokenCandidate = decodeJwtToken(newToken)
            if (tokenCandidate.valid) {
              sessionStorage.setItem(TOKEN_KEY, newToken)
              transition({ sessionToken: tokenCandidate, refreshToken: state.refreshToken })
              return Promise.resolve(tokenCandidate.encoded)
            } else {
              transition(state)
              return Promise.reject(new Error('Refreshed token but got invalid token back'))
            }
          })
      } else { // expired
        return refresher({sessionToken: null, refreshToken: refreshToken.value})
      }
    },
    saveSessionToken: (newToken) => {
      const tokenCandidate = decodeJwtToken(newToken)
      if (tokenCandidate.valid) {
        sessionStorage.setItem(TOKEN_KEY, newToken)
        if (refreshToken.valid && refreshToken.email !== tokenCandidate.email) {
          localStorage.removeItem(REFRESH_TOKEN_KEY)
          transition({ sessionToken: tokenCandidate, refreshToken: { valid: false } })
        } else {
          transition({ sessionToken: tokenCandidate, refreshToken: state.refreshToken })
        }
      } else {
        transition(state)
      }
    },
    saveRefreshToken: (newRefreshToken) => {
      const candidateRefreshToken = { email: state.sessionToken.email, token: newRefreshToken }
      localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(candidateRefreshToken))
      transition({ ...state, refreshToken: candidateRefreshToken })
    },
    forgetTokens: () => {
      sessionStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      transition({ sessionToken: { valid: false }, refreshToken: { valid: false } })
    }
  }))
}

const ensureStorage = (window) => {
  const sessionStorage = isLocalStorageAvailable(window.sessionStorage) ? window.sessionStorage : memoryStorage()
  const localStorage = isLocalStorageAvailable(window.localStorage) ? window.localStorage : memoryStorage()
  return { sessionStorage, localStorage }
}

// Need to account for time diff with the server, otherwise client may think the token is valid, and server refuse it
const EXPIRATION_SAFETY_DURATION = 2 * 60 // 2 min should be enough
const RENEWABLE_DURATION = 10 * 60 // 10 min should be enough

function calcExpirationTime (exp) {
  // return Date.now() + 10 * 1000
  return (exp - EXPIRATION_SAFETY_DURATION) * 1000
}

const expired = (decodedToken, now) => {
  return now > decodedToken.expirationTime
}

const needsRenewal = (decodedToken, now) => {
  return now > (decodedToken.expirationTime - RENEWABLE_DURATION * 1000)
}

const decodeJwtToken = (token) => {
  if (!token || !token.length) return { valid: false, error: 'Empty token' }
  const decoded = jws.decode(token)
  if (!decoded) return { valid: false, error: 'Invalid token' }
  return {
    valid: true,
    email: decoded.payload.sub,
    expirationTime: calcExpirationTime(decoded.payload.exp),
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
