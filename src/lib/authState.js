import StateMachine from './StateMachine'
import createCredentials from './credentials'
import deviceInfo from './deviceInfo'

const noop = () => {}

export default (window, authApi, { onReset = noop, onChanged = noop }) => {
  const cachedProfile = (token, profile) => profile ? Promise.resolve(profile) : authApi.fetchProfile(token)

  const validToken = (credentials, now) => {
    if (credentials.valid(now)) {
      return Promise.resolve(credentials.sessionToken)
    } else if (credentials.canRenew(now)) {
      return authApi.renewToken(credentials.sessionToken)
    } else if (credentials.refreshToken) { // expired but can re-issue
      return authApi.issueToken(credentials.refreshToken)
    } else {
      return Promise.reject(new Error('No valid tokens'))
    }
  }

  const tokenAndProfile = ({ credentials, profile }, now) =>
    validToken(credentials, now)
      .then(token => cachedProfile(token, profile)
        .then(profile => ({ token, profile }))
      )

  const deleteRefreshTokenIfExists = (credentials) =>
    credentials.refreshToken
      ? authApi.destroyRefreshToken(credentials.refreshToken, credentials.sessionToken)
      : Promise.resolve()

  const initialState = { authenticated: false, credentials: createCredentials(window) }

  return StateMachine((state = initialState, transition) => ({
    signinWithToken: (token) => {
      onReset()
      transition({ authenticated: false, credentials: state.credentials.withSessionToken(token), profile: null })
      return Promise.resolve(true)
    },
    authenticate: () => {
      return tokenAndProfile(state, Date.now()).then(({ token, profile }) => {
        if (!state.authenticated || state.credentials.sessionToken !== token) {
          onChanged({ authenticated: true, token, profile, persisted: !!state.credentials.refreshToken })
        }
        const credentials = state.credentials.withSessionToken(token)
        transition({ authenticated: true, credentials, profile })
        return { token, profile, milestones: credentials.milestones() }
      })
    },
    invalidateSession: () => {
      // token was refused by the server
      onChanged({ authenticated: false, token: null, profile: {}, persisted: !!state.credentials.refreshToken })
      transition({ authenticated: false, credentials: state.credentials.withoutSessionToken(), profile: null })
      return Promise.resolve()
    },
    persist: () => {
      if (state.credentials.refreshToken) {
        return Promise.resolve(state.credentials.refreshToken)
      } else {
        return deviceInfo()
          .then(info => authApi.createRefreshToken(info, state.credentials.sessionToken))
          .then((refreshToken) => {
            onChanged({ authenticated: state.authenticated, token: state.credentials.sessionToken, profile: state.profile, persisted: !!refreshToken })
            transition({ ...state, credentials: state.credentials.withRefreshToken(refreshToken) })
          })
      }
    },
    reloadProfile: () => {
      if (state.authenticated) {
        return authApi.fetchProfile(state.credentials.sessionToken).then(profile => {
          onChanged({ authenticated: state.authenticated, token: state.credentials.sessionToken, profile, persisted: !!state.credentials.refreshToken })
          transition({ ...state, profile })
        })
      } else {
        return Promise.reject(new Error('Not authenticated'))
      }
    },
    acceptInvite: (token) => {
      return authApi.invitationToken(token)
    },
    signOut: () => {
      const doSignout = () => {
        onChanged({ authenticated: false, token: null, profile: {}, persisted: false })
        transition({ authenticated: false, credentials: state.credentials.cleared(), profile: null })
        return Promise.resolve()
      }
      return deleteRefreshTokenIfExists(state.credentials).then(doSignout, doSignout)
    }
  }))
}
