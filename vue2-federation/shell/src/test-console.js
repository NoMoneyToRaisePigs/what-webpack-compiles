import TheFirst from './dep.js'
import TheSecond from './dep1.js'

export function myExport() {
    return 'does not matter export what' + TheFirst + TheSecond.slice(0,1)
} 

export default function dedupe(arr) {
    return [...new Set(arr)]
}

export function double(num) {
    return num * 2
}

console.log('test')
// exports.myExport = xxx