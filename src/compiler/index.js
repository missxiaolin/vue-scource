
// ast 语法树
import { parseHTML } from './parser-html';

export function compileToFunction(template) {
    let rendor = parseHTML(template)
    console.log(rendor)
    return function render() {

    }
}