import { initState } from './state'

export function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
        // 数据劫持
        const vm = this
        vm.$options = options
        
        // 初始化状态
        initState(vm) // 分割代码
    }
}