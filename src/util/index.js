
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

const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
]
let strats = {}
function mergeHook(parentVal, childVal) {
    if (childVal) {
        if (parentVal) {
            return parentVal.concat(childVal)
        } else {
            return [childVal]
        }

    } else {
        return parentVal
    }
}
LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})


/**
 * 合并参数
 * @param {*} parent 
 * @param {*} child 
 */
export function mergeOptions(parent, child) {
    const options = {}
    for (let key in parent) {
        mergeField(key);
    }

    for (let key in child) { // 如果已经合并过则不进行合并
        if (!parent.hasOwnProperty(key)) {
            mergeField(key);
        }
    }

    /**
     * 默认合并策略
     * @param {*} key 
     */
    function mergeField(key) {
        if (strats[key]) {
            return options[key] = strats[key](parent[key], child[key])
        }
        if (typeof parent[key] === 'object' && typeof child[key] === 'object') {
            options[ket] = {
                ...parent[key],
                ...child[key]
            }
        } else if (child[key] == null) {
            options[key] = parent[key]
        } else {
            options[key] = child[key]
        }
    }
    return options
}