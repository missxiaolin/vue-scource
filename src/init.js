import { initState } from './state'
import { compileToFunction } from './compiler/index'
import { mountComponent, callHook } from './lifecycle'
import { mergeOptions } from './util/index'

export function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
        // 数据劫持
        const vm = this

        // 将用户传递和全局进行合并
        vm.$options = mergeOptions(vm.constructor.options, options)

        callHook(vm, 'beforeCreate')

        // 初始化状态
        initState(vm) // 分割代码

        callHook(vm, 'created')

        // 如果用户传入el属性 渲染 
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        const vm = this
        const options = vm.$options
        el = document.querySelector(el)

        // 默认查询是否有render 没有render 会采用 template template没有就用el的内容
        if (!options.render) {
            // 进行模板编译
            let template = options.template
            if (!template && el) {
                template = el.outerHTML
                const render = compileToFunction(template)
                options.render = render
            }
        }
        // 渲染
        mountComponent(vm, el)
    }
}