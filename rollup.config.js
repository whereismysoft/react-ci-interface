import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve'
import html from '@rollup/plugin-html';
import { terser } from "rollup-plugin-terser";

import template from './viewTemplate/index'

const env = process.env.NODE_ENV;
const isProduction = env === 'production'

export default {
    input: './src/index.js',
    output: [
        {
            name: 'bundle',
            sourcemap: true,
            file: './dist/index.js',
            format: 'iife',
        },
    ],
    plugins: [
        nodeResolve({
            extensions: [".js"],
            browser: true,
        }),
        replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
        babel({
            // exclude: 'node_modules/**',
            presets: [['@babel/preset-react', {
                "runtime": "automatic"
            }]],
            babelHelpers: 'bundled',
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                // This is needed because `react/jsx-runtime` exports `jsx` on the module export.
                // Without this mapping the transformed import `import {jsx as _jsx} from 'react/jsx-runtime'` will fail.
                'react/jsx-runtime': ['jsx', 'jsxs', 'Fragment'],
                'react/jsx-dev-runtime': ['jsxDEV', 'Fragment'],
            },
        }),
        postcss({
            extract: false,
            modules: true,
            // use: ['sass'],
        }),
        isProduction && terser({
            toplevel: true,
            mangle: true,
            compress: true
        }), // uglify-es is no longer maintained and uglify-js does not support ES6+.
        html({ template, title: 'ci interface' }),
        !isProduction && serve({ contentBase: 'dist', openPage: '/', open: true, port: 8080, })
    ],
    // external: ['react', 'react-dom', 'prop-types', 'styled-components'],
};

// import { babel } from '@rollup/plugin-babel';
// import commonjs from 'rollup-plugin-commonjs';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import replace from '@rollup/plugin-replace';
// import postcss from 'rollup-plugin-postcss';
// // import uglify from 'rollup-plugin-uglify';

// const env = process.env.NODE_ENV;

// export default {
//     input: './src/index.js',
//     output: {
//         name: 'bundle',
//         sourcemap: true,
//         file: './dist/index.js',
//         format: 'iife',
//         // globals: { react: 'React', 'react-dom': 'ReactDom' },
//     },
//     format: 'iife',
//     plugins: [
//         nodeResolve(),
//         replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
//         commonjs({ include: 'node_modules/**' }),
//         babel({
//             exclude: 'node_modules/**',
//             presets: ['@babel/preset-react'],
//             babelHelpers: 'bundled'
//         }),
//         postcss({
//             extract: false,
//             modules: true,
//             // use: ['sass'],
//         }),
//         // env === 'production' && uglify()
//     ]
// };