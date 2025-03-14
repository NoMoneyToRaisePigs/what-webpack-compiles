export function httpRequest(config){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                from: config.url,
                data: 'mock data',
                payload: config.data,
                params: config.params
            })
        }, 1000);
    })
}

export function rawRequest(config){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                from: config.url,
                data: 'mock data',
                payload: config.data,
                params: config.params
            })
        }, 1000);
    })
}