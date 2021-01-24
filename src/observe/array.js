
let oldArrayMethods = Array.prototype

export let arrayMethods = Object.create(oldArrayMethods)

const methteds = [
    'push',
    'shift',
    'unshift',
    'pop',
    'sort',
    'splice',
    'reverser'
]

methteds.forEach(methed => {
    arrayMethods[methed] = function(...args) {
        const result = oldArrayMethods[methed].apply(this, args) // 调用原生数组方法
        let inserted; // 当前元素
        let ob = this.__ob__
        switch(methed) {
            case 'push':
            case 'unshift': 
                inserted = args
                break
            case 'splice':
                inserted = args.splice(2)
                break
            default :
                break
        }
        if (inserted) ob.observerArray(inserted) // 将新增熟悉继续观测
        return result
    }
})