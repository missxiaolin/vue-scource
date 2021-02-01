import { isObject, def } from '../util/index'
import { arrayMethods } from './array'
import Dep from '../observe/dep'

class Observer {
    constructor(value) {
        // value.__ob__ = this
        def(value, '__ob__', this)
        if (Array.isArray(value)) {
            // 如果是数据的话不会对索引进行观测 性能问题
            value.__proto__ = arrayMethods
            // 如果数据是对象监控
            this.observerArray(value)
        } else {
            this.walk(value)
        }

    }

    /**
     * 
     * @param {*} value 
     */
    observerArray(value) {
        for (let i = 0; i < value.length; i++) {
            observe(value[i])
        }
    }

    /**
     * 
     * @param {*} data 
     */
    walk(data) {
        let keys = Object.keys(data)
        keys.forEach((key) => {
            defineReactive(data, key, data[key])
        })
    }


}

/**
 * 数据劫持
 * @param {*} data 
 * @param {*} key 
 * @param {*} value 
 */
function defineReactive(data, key, value) {
    let dep = new Dep()
    observe(value)
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
            if (Dep.target) {
                dep.depend() // 存watcher
            }
            return value
        },
        set(newValue) {
            if (newValue === value) return
            observe(newValue)
            value = newValue
            dep.notify() // 通知依赖watcher执行更新操作
        }
    })
}

export function observe(data) {
    let isObj = isObject(data)
    if (!isObj) return
    return new Observer(data)
}