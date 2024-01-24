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
        try {
          if(window[remoteName].__initialized__) {
            return
          } else {
            console.log(`${remoteName} init ---`)
            window[remoteName].__initialized__ = true
            return window[remoteName].init(args)
          }
        } catch (err) {
          logError(`Remote container ${remoteName} initialization failed - ${formatError(err)}`)
          return
        }
      }
    })
  
    return (resolve, reject) => {
      const remoteUrl = getRemoteUrl(remoteName)
      // const alreadyInjected = document.querySelector(`[src$="federation-${remoteName}/remoteEntry.js"]`)

      // if (alreadyInjected) {
      //   if(window[remoteName]) {
      //     resolve(successProxy())
      //     return
      //   } else {
      //     const timer = setInterval(() => {
      //       if(window[remoteName]) {
      //         clearInterval(timer)
      //         resolve(successProxy())
      //       }
      //     }, 100);
  
      //     return
      //   }
      // }
      
  
      // if (alreadyInjected) {
      //   const timer = setInterval(() => {
      //     if(window[remoteName]) {
      //       clearInterval(timer)
      //       setTimeout(() => {
      //         resolve(successProxy())
      //       })
      //     }
      //   }, 100);

      //   return
      // }

      if(window[remoteName]?.__initialized__) {
        resolve(successProxy())
        return
      }

      const alreadyInjected = !!document.querySelector(`#${remoteName}`)

      if (alreadyInjected) {
        if (window[remoteName]) {
          resolve(successProxy())
          return
        } else {
          const timer = setInterval(() => {
            if (window[remoteName]) {
              clearInterval(timer)
              resolve(successProxy())
            }
          }, 100)
  
          return
        }
      }

      if(document.querySelector(`[src$="../federation-${remoteName}/remoteEntry.js"]`)) {
        resolve({
          get: (request) => getModule(request),
          init: (args) => {
            console.log(`${remoteName} empty init`)
            return
          }
        })

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
  
  const getRemoteConfig = (remoteName) => `return window['__promise_${remoteName}_remote__'] ? window['__promise_${remoteName}_remote__'] : (window['__promise_${remoteName}_remote__'] = new Promise((${remoteLoader})('${remoteName}')))`
  
  module.exports = getRemoteConfig
  