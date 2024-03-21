const remoteLoader = (remoteName, env, app) => {
  const WINDOW_OBJECT_NAME = `__federation_${remoteName}__`

  const getRemoteUrl = (remoteName) => {
    const FEDERATION = 'federation'
    return `${window.location.origin}/${FEDERATION}-${remoteName}/remoteEntry.js`
  }

  const formatError = (e) => (e instanceof Error ? `(${e.message})` : JSON.stringify(e))

  const getModule = (request) => {
    try {
      return window[WINDOW_OBJECT_NAME].get(request)
    } catch (err) {
      console.error(`(Script Loading succeed)Error loading module ${request} for ${remoteName}@${getRemoteUrl(remoteName)} - ${formatError(err)}`)
      return undefined
    }
  }

  const successProxy = () => ({
    get: (request) => getModule(request),
    init: (args) => {
      const remoteUrl = getRemoteUrl(remoteName)
      const cacheKey = `${remoteUrl}-${remoteName}`

      try {
        if (window[WINDOW_OBJECT_NAME].__initialized__) {
          return
        } else {
          console.log(`${remoteName} initialized...`)
          window[WINDOW_OBJECT_NAME].__initialized__ = true
          return window[WINDOW_OBJECT_NAME].init(args)
        }
      } catch (err) {
        console.error(`Remote container ${remoteName} initialization failed - ${formatError(err)}`)
        return undefined
      }
    }
  })

  return (resolve, reject) => {
    const remoteUrl = getRemoteUrl(remoteName)

    if (window[WINDOW_OBJECT_NAME]?.__initialized__) {
      resolve(successProxy())
      return
    }

    const alreadyInjected = !!document.querySelector(`#${remoteName}`)

    if (alreadyInjected) {
      if (window[WINDOW_OBJECT_NAME]) {
        resolve(successProxy())
        return
      } else {
        const timer = setInterval(() => {
          if (window[WINDOW_OBJECT_NAME]) {
            clearInterval(timer)
            resolve(successProxy())
          }
        }, 100)

        return
      }
    }

    const injectedScript = document.querySelector(`[src$="federation-${remoteName}/remoteEntry.js"]`)
    const isHost = injectedScript && !injectedScript.id

    if (isHost) {
      console.log('Host already initialized...')
      window[WINDOW_OBJECT_NAME].__initialized__ = true
      resolve(successProxy())
      return
    }

    const script = document.createElement('script')

    script.src = remoteUrl
    script.id = remoteName

    script.onload = () => {
      resolve(successProxy())
    }

    script.onerror = (err) => {
      console.error(`Error loading remote container ${remoteName}@${remoteUrl} - ${formatError(err)}`)

      const fallBackProxy = {
        get: (request) => {
          // Fallback when the service is down
          console.error(`(Script Loading failed)Error loading module ${request} for ${remoteName}@${getRemoteUrl(remoteName)} - ${formatError(err)}`)
          return Promise.resolve(() => () => `${remoteName}@${remoteUrl} is not available`)
        },
        init: (arg) => {
          return
        }
      }

      resolve(fallBackProxy)
    }

    document.head.appendChild(script)
  }
}

const getRemoteConfig = (remoteName, env, app) => `return window['__promise_${remoteName}_remote__'] ? window['__promise_${remoteName}_remote__'] : (window['__promise_${remoteName}_remote__'] = new Promise((${remoteLoader})('${remoteName}', '${env}', '${app}')))`

module.exports = getRemoteConfig
