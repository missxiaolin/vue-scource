import { isObject } from '../util/index'

class Observer {
    constructor(value) {
        this.walk(value)
    }

    /**
     * 
     * @param {*} data 
     */
    walk(data) {
        let keys = Object.keys(data)
        keys.forEach((key) => {
            defineReactive(data, key , data[key])
        })
    }


}

/**
 * 数据劫持
 * @param {*} data 
 * @param {*} key 
 * @param {*} value 
 */
function defineReactive (data, key , value) {
    observe(value)
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue === value) return
            observe(newValue)
            value = newValue
        }
    })
}

export function observe(data) {
    let isObj = isObject(data)
    if (!isObj) return
    return new Observer(data)
}