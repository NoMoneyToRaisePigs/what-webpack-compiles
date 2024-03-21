(self["webpackChunk_federation_shell_"] = self["webpackChunk_federation_shell_"] || []).push([["app"], {
    /***/
    "./node_modules/webpack/hot/log.js": /***/
    ((module)=>{

        /** @typedef {"info" | "warning" | "error"} LogLevel */

        /** @type {LogLevel} */
        var logLevel = "info";

        function dummy() {}

        /**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
        function shouldLog(level) {
            var shouldLog = (logLevel === "info" && level === "info") || (["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") || (["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
            return shouldLog;
        }

        /**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
        function logGroup(logFn) {
            return function(level, msg) {
                if (shouldLog(level)) {
                    logFn(msg);
                }
            }
            ;
        }

        /**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
        module.exports = function(level, msg) {
            if (shouldLog(level)) {
                if (level === "info") {
                    console.log(msg);
                } else if (level === "warning") {
                    console.warn(msg);
                } else if (level === "error") {
                    console.error(msg);
                }
            }
        }
        ;

        /* eslint-disable node/no-unsupported-features/node-builtins */
        var group = console.group || dummy;
        var groupCollapsed = console.groupCollapsed || dummy;
        var groupEnd = console.groupEnd || dummy;
        /* eslint-enable node/no-unsupported-features/node-builtins */

        module.exports.group = logGroup(group);

        module.exports.groupCollapsed = logGroup(groupCollapsed);

        module.exports.groupEnd = logGroup(groupEnd);

        /**
 * @param {LogLevel} level log level
 */
        module.exports.setLogLevel = function(level) {
            logLevel = level;
        }
        ;

        /**
 * @param {Error} err error
 * @returns {string} formatted error
 */
        module.exports.formatError = function(err) {
            var message = err.message;
            var stack = err.stack;
            if (!stack) {
                return message;
            } else if (stack.indexOf(message) < 0) {
                return message + "\n" + stack;
            } else {
                return stack;
            }
        }
        ;

        /***/
    }
    ),

    /***/
    "./src/main.js": /***/
    ((__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{

        Promise.all(/* import() */
        [__webpack_require__.e("vendors-node_modules_vue-hot-reload-api_dist_index_js-node_modules_vue-loader_lib_runtime_com-11b133"), __webpack_require__.e("vendors-node_modules_vue-router_dist_vue-router_esm_js"), __webpack_require__.e("webpack_sharing_consume_default_vue_vue"), __webpack_require__.e("src_bootstrap_js")]).then(__webpack_require__.bind(__webpack_require__, "./src/bootstrap.js"))

        /***/
    }
    ),

    /***/
    "webpack/container/reference/binance": /***/
    ((module)=>{

        "use strict";
        module.exports = window['__promise_binance_remote__'] ? window['__promise_binance_remote__'] : (window['__promise_binance_remote__'] = new Promise(((remoteName,env,app)=>{
            const WINDOW_OBJECT_NAME = `__federation_${remoteName}__`

            const getRemoteUrl = (remoteName)=>{
                const FEDERATION = 'federation'
                return `${window.location.origin}/${FEDERATION}-${remoteName}/remoteEntry.js`
            }

            const formatError = (e)=>(e instanceof Error ? `(${e.message})` : JSON.stringify(e))

            const getModule = (request)=>{
                try {
                    return window[WINDOW_OBJECT_NAME].get(request)
                } catch (err) {
                    console.error(`(Script Loading succeed)Error loading module ${request} for ${remoteName}@${getRemoteUrl(remoteName)} - ${formatError(err)}`)
                    return undefined
                }
            }

            const successProxy = ()=>({
                get: (request)=>getModule(request),
                init: (args)=>{
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

            return (resolve,reject)=>{
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
                        const timer = setInterval(()=>{
                            if (window[WINDOW_OBJECT_NAME]) {
                                clearInterval(timer)
                                resolve(successProxy())
                            }
                        }
                        , 100)

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

                script.onload = ()=>{
                    resolve(successProxy())
                }

                script.onerror = (err)=>{
                    console.error(`Error loading remote container ${remoteName}@${remoteUrl} - ${formatError(err)}`)

                    const fallBackProxy = {
                        get: (request)=>{
                            // Fallback when the service is down
                            console.error(`(Script Loading failed)Error loading module ${request} for ${remoteName}@${getRemoteUrl(remoteName)} - ${formatError(err)}`)
                            return Promise.resolve(()=>()=>`${remoteName}@${remoteUrl} is not available`)
                        }
                        ,
                        init: (arg)=>{
                            return
                        }
                    }

                    resolve(fallBackProxy)
                }

                document.head.appendChild(script)
            }
        }
        )('binance', 'undefined', 'undefined')));

        /***/
    }
    )

}, /******/
__webpack_require__=>{
    // webpackRuntimeModules
    /******/
    var __webpack_exec__ = (moduleId)=>(__webpack_require__(__webpack_require__.s = moduleId))
    /******/
    var __webpack_exports__ = (__webpack_exec__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8081&pathname=%2Fws&logging=error&overlay=%7B%22errors%22%3Atrue%2C%22warnings%22%3Afalse%7D&reconnect=10&hot=true&live-reload=true"),
    __webpack_exec__("./node_modules/webpack/hot/dev-server.js"),
    __webpack_exec__("./src/main.js"));
    /******/
}
]);