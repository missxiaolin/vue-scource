import { initMixin } from './init'

// vue 核心代码
function Vue(options) {
    // vue 初始化
    this._init(options)
}
initMixin(Vue)



export default Vue