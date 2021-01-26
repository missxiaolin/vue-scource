
/**
 * 判断是会否是对象
 * @param {*} data 
 */
export function isObject(data) {
    return typeof data === 'object' && data !== null
}

/**
 * 
 * @param {*} data 
 * @param {*} key 
 * @param {*} value 
 */
export function def(data, key, value) {
    Object.defineProperty(data, key, {
        enumerable: false,
        configurable: false,
        value: value
    })
}

/**
* 代理
* @param {*} vm 
* @param {*} source 
* @param {*} key 
*/
export function proxy(vm, source, key) {
   Object.defineProperty(vm, key, {
       get() {
           return vm[source][key]
       },
       set(newValue) {
           vm[source][key] = newValue
       }
   })
}