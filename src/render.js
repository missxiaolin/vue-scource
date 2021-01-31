

export function renderMixin(Vue) {

    Vue.prototype._c = function() {
        return createElement(...arguments)
    }

    Vue.prototype_v= function(text) {
        return createTextNode(text)
    }

    Vue.prototype_s = function(val) {
        return val === null ? '' : (typeof val === 'object' ? JSON.stringify(val) : val) 
    }

    Vue.prototype._render = function () {
        const vm = this
        const { render } = vm.$options
        console.log(render)
        render.call(vm)
    }
}