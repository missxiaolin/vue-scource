
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