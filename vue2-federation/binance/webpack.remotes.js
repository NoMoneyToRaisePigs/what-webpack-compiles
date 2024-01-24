const remoteLoader = (remoteName) => {
  const getRemoteUrl = (remoteName) => {
    const FEDERATION = 'federation'
    return `${window.location.origin}/${FEDERATION}-${remoteName}/remoteEntry.js`
  }

  const logError = (message) => { console.error(message) }

  const formatError = (e) => (e instanceof Error ? `(${e.message})` : JSON.stringify(e))

  const getModule = (request) => {
    try {
      return window[remoteName].get(request)
    } catch (err) {
      logError(`(Script Loading succeed)Error loading module ${request} for ${remoteName}@${getRemoteUrl(remoteName)} - ${formatError(err)}`)
      return undefined
    }
  }

  const successProxy = () => ({
    get: (request) => getModule(request),
    init: (args) => {
      const remoteUrl = getRemoteUrl(remoteName)
      const cacheKey = `${remoteUrl}-${remoteName}`

      try {
        if (!window.__ba_federation_module_cache__[cacheKey]) {
          window.__ba_federation_module_cache__[cacheKey] = {
            get: (request) => getModule(request),
            init: (arg) => undefined
          }

          const injectedRemote = document.querySelector(`[src$="federation-${remoteName}/remoteEntry.js"]`)

          if (injectedRemote && !injectedRemote.id) {
            return
          }

          return window[remoteName].init(args)
        } else {
          return undefined
        }
      } catch (err) {
        logError(`Remote container ${remoteName} initialization failed - ${formatError(err)}`)
        return undefined
      }
    }
  })

  return (resolve, reject) => {
    window.__ba_federation_module_cache__ = window.__ba_federation_module_cache__ || {}
    const remoteUrl = getRemoteUrl(remoteName)
    const remoteUrlX = `${window.location.origin}/federation-${remoteName}/remoteEntryx.js`
    const cacheKey = `${remoteUrl}-${remoteName}`

    if (window.__ba_federation_module_cache__[cacheKey]) {
      resolve(window.__ba_federation_module_cache__[cacheKey])
      return
    }

    let useX = false
    const injectedRemote = document.querySelector(`[src$="federation-${remoteName}/remoteEntry.js"]`)
    
    if (injectedRemote && !injectedRemote.id) {
      useX = true
    }

    // if (document.querySelector(`#${remoteName}`)) {
    //   // return
    //   // useX = true
    //   const timer = setInterval(() => {
    //     if(window[remoteName]) {
    //       clearInterval(timer)
    //       resolve(successProxy())
    //     }
    //   }, 100);

    //   return
    // }

    const script = document.createElement('script')
    
    script.src = useX ? remoteUrlX : remoteUrl
    script.id = remoteName

    script.onload = () => {
      resolve(successProxy())
    }

    script.onerror = (err) => {
      console.error(`Error loading remote container ${remoteName}@${remoteUrl} - ${formatError(err)}`)

      const fallBackProxy = {
        get: (request) => {
          // Fallback when the service is down
          logError(`(Script Loading failed)Error loading module ${request} for ${remoteName}@${getRemoteUrl(remoteName)} - ${formatError(err)}`)
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

const getRemoteConfig = (remoteName) => `promise new Promise((${remoteLoader})('${remoteName}'))`

module.exports = getRemoteConfig
