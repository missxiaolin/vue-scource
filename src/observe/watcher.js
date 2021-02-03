import { pushTarget, popTarger } from './dep.js'
import { queueWatcher } from './schedular'


let id = 0

class Watcher {
    constructor(vm, exprOrFn, callback, options) {
        this.vm = vm;
        this.callback = callback;
        this.options = options;
        this.id = id++
        this.getter = exprOrFn; // 将内部传过来的回调函数 放到getter属性上
        this.depsId = new Set() // 集合
        this.deps = []

        this.get(); // 调用get 方法会让渲染watcher 执行
    }
    addDep(dep) { // watcher 不能放重复dep dep不能放重复 watcher
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.depsId.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
    get() {
        pushTarget(this) // 存watcher
        this.getter(); // 渲染watcher 执行
        popTarger() // 移除watcher
    }

    update() {
        queueWatcher(this)
        // 执行渲染
        // this.get()
    }

    run() {
        // 渲染
        this.get()
    }
}

export default Watcher