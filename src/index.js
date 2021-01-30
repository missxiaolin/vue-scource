import { initMixin } from './init'
import { renderMixin } from './render'
import { lifecycMixin } from './lifecycle'

// vue 核心代码
function Vue(options) {
    // vue 初始化
    this._init(options)
}
initMixin(Vue)
renderMixin(Vue)
lifecycMixin(Vue)



export default Vue