import Vue from 'vue'

function request(data, info) {
    console.log('---:', info)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(data);
        }, 300);
    });
}

// let index = 666

Object.defineProperty(module.exports, 'rawRequest', {
    get: function() {
      return (data) => {
        return request(data);
      }
    }
  });

//   const handler = {
//     get: function(target, prop, receiver) {
//       if (prop === 'rawRequest') {
//         return function(data) {
//             return request(data, index);
//         };
//       }
//       return Reflect.get(...arguments);
//     }
//   };
  
// //   module.exports = new Proxy({}, handler);
// Object.defineProperty(module.exports, 'rawRequest', handler)


// export const rawRequest = (() => {
//     return (data) => {
//       console.log("Request function called");
//       return request(data)
//     };
//   })();

// Object.defineProperty(exports, 'rawRequest', {
//     get: function(data) {
//       return request(data);
//     }
//   });

// let xxxx = function() {

// }


// export default function requestWrapper(path) {

//     const xpath = path


//     xxx = (data) => request(data, xpath)
    
// }

// export { xxx as rawRequest }

// export default function rawRequest(data) {

//     const xpath = path


//     return request(data, xpath)
// }

// export { xxx }
// export const rawRequest = xxx.aaa


// export function rawRequest(data) {
//    console.log(new Error().stack) 
//    const path =  Vue.prototype.$getRouteSnapshot()

//     return request(data, path)
// }

// let allRoutes = []

// function* generatorRequest() {
//     for (let i = 0; i <= allRoutes.length; i++) yield (data) => { return requestWrapper(data, allRoutes[i]) };
// }

// export const gen = generatorRequest().next()


// export function rawRequest(data) {
//      gen.value(data)
// }


// export { allRoutes as xroutes }