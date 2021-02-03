
let callbacks = []
let waiting = false

/**
 * 执行
 */
function flushCallback() {
    callbacks.forEach(c => c())
    waiting = false
}

/**
 * @param {*} cb 
 */
export function nextTick(cb) {
    callbacks.push(cb)
    if (waiting === false) {
        setTimeout(flushCallback, 0)
        waiting = true
    }
    
}