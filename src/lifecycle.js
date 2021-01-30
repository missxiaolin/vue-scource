
/**
 * 
 * @param {*} Vue 
 */
export function lifecycMixin(Vue) {
    Vue.prototype._update = function() {

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
    console.log(options)
    // 渲染页面
    let updateComponent = () => {
        // 返回虚拟dom
        vm._update(vm._render())
    }
    // 渲染watcher
    new Watcher(vm, updateComponent, () => {}, true)

}