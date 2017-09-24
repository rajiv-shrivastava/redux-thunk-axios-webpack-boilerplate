import Fingerprint2 from 'fingerprintjs2'
import platform from 'platform'

export default () => {
  if (typeof navigator === 'undefined') {
    return Promise.resolve({
      display: 'Test platform',
      fingerprint: '1234567890'
    })
  }
  return new Promise((resolve) => {
    new Fingerprint2().get(function (result) {
      resolve({
        display: platform.description,
        fingerprint: result
      })
    })
  })
}
