export default function request(config) {
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