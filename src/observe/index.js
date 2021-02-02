import { isObject, def } from '../util/index'
import { arrayMethods } from './array'
import Dep from '../observe/dep'

class Observer {
    constructor(value) {
        this.dep = new Dep()
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
    // 这个value 可能是数组 可能是对象，返回结果是observer 实例 ，当前value对应的observer
    let childOb = observe(value)
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
            if (Dep.target) {
                dep.depend() // 存watcher
                if (!!childOb) {
                    childOb.dep.depend() // 收集数组相关依赖
                    // 如果数组还有数组
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
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

/**
 * 递归数组增加监测
 * @param {*} value 
 */
function dependArray(value) {
    for (let i = 0; i < value.length; i++) {
        let current = value[i]
        current.__ob__ && current.__ob__.dep.depend()
        if (Array.isArray(current)) {
            dependArray(current)
        }
    }
}

export function observe(data) {
    let isObj = isObject(data)
    if (!isObj) return
    return new Observer(data)
}