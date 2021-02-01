import Watcher from './observe/watcher'
import { patch } from './vdom/patch'

/**
 * 
 * @param {*} Vue 
 */
export function lifecycMixin(Vue) {
    Vue.prototype._update = function(vnode) {
        const vm = this
        // 通过虚拟节点渲染真实dom
        vm.$el = patch(vm.$el, vnode)

    }
}

/**
 * 
 * @param {*} vm 
 * @param {*} el 
 */
export function mountComponent(vm, el) {
    const options = vm.$options // render
    vm.$el = el // dom
    callHook(vm, 'beforeMount')
    // 渲染页面
    let updateComponent = () => {
        // 返回虚拟dom
        vm._update(vm._render())
    }
    // 渲染watcher
    new Watcher(vm, updateComponent, () => {}, true)
    callHook(vm, 'mounted')
}

/**
 * 找到对应的钩子依次执行
 * @param {*} vm 
 * @param {*} hook 
 */
export function callHook(vm, hook) {
    const handles = vm.$options[hook] // [fn , fn]
    if (handles) {
        for (let i = 0; i < handles.length; i++) {
            handles[i].call(vm)
        }
    }
}