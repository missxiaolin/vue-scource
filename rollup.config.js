import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
    input: './src/index.js',
    output: {
        file: 'dist/umd/vue.js',
        format: 'umd',
        name: 'Vue',
        sourcemap: true, // es6->es5 开启源码调试
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        process.env.ENV === 'development' ? serve({
            open: true,
            openPage: '/public/index.html',
            contentBase: '',
            port: 9011
        }) : null,
    ],
    // 那些模块是外部变量，可以不打包的js中，减小体积
    external: []
}