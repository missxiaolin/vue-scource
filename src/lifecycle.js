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
    // 渲染页面
    let updateComponent = () => {
        // 返回虚拟dom
        vm._update(vm._render())
    }
    // 渲染watcher
    new Watcher(vm, updateComponent, () => {}, true)

}