import { mergeOptions } from '../util/index'

export function initGlobalAPI(Vue) {
    // 整合全局相关的内容
    Vue.options = {}

    Vue.mixin = function (mixin) {
        // 如何实现2个对象合并
        this.options = mergeOptions(this.options, mixin)
    }

    Vue.mixin({
        a: 1,
        beforeCreate() {
            console.log(1)
        }
    })
    Vue.mixin({
        b: 2,
        beforeCreate() {
            console.log(2)
        }
    })
    console.log(Vue.options)
}