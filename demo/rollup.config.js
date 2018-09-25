import resolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
    input: 'js/main.js',
    output: {
        file: 'js/main-bundle.js',
        format: 'iife',
        name: 'main-bundle.js'
    },
    plugins: [
        resolve(),
        commonJs(),
        babel()
    ]
}