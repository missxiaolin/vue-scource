

let id = 0

class Dep {

    constructor() {
        this.id = id++
        this.subs = []
    }

    depend() {
        this.subs.push(Dep.target) // 观察者模式
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