(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function initState(vm) {
      var opts = vm.$options;

      if (opts.props) ;

      if (opts.methods) ;

      if (opts.data) {
        initData(vm);
      }

      if (opts.computed) ;

      if (opts.watch) ;
    }
    /**
     * 数据初始化
     * @param {*} vm 
     */


    function initData(vm) {
      var data = vm.$options.data;
      data = vm._data = typeof data === 'function' ? data.call(vm) : data; // 对象劫持 Object.definProperty

      observe(data);
    }

    function initMixin(Vue) {
      // 初始化流程
      Vue.prototype._init = function (options) {
        // 数据劫持
        var vm = this;
        vm.$options = options; // 初始化状态

        initState(vm); // 分割代码
      };
    }

    function Vue(options) {
      // vue 初始化
      this._init(options);
    }

    initMixin(Vue);

    return Vue;

})));
//# sourceMappingURL=vue.js.map
