

let id = 0

class Dep {

    constructor() {
        this.id = id++
        this.subs = []
    }

    /**
     * 存储watcher
     * @param {*} watcher 
     */
    addSub(watcher) {
        this.subs.push(watcher) // 观察者模式
    }

    depend() {
        Dep.target.addDep(this)
    }

    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}

let stack = []

/**
 * 存watcher
 * @param {*} watcher 
 */
export function pushTarget(watcher) {
    Dep.target = watcher
    stack.push(watcher)
}

/**
 * 移除watcher
 */
export function popTarger() {
    stack.pop()
    Dep.target = stack[stack.length - 1]
}

export default Dep