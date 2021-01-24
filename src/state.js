import { observe } from './observe/index'

export function initState(vm) {
    const opts = vm.$options;
    if (opts.props) {
        initProps(vm)
    }
    if (opts.methods) {
        initMethods(vm)
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }
}

function initProps() {

}

function initMethods() {

}

/**
 * 数据初始化
 * @param {*} vm 
 */
function initData(vm) {
    let data = vm.$options.data
    data = vm._data = typeof data === 'function' ? data.call(vm) : data
    // 对象劫持 Object.definProperty
    observe(data)
}


function initComputed() {

}


function initWatch() {

}