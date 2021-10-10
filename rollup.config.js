import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve'
import html from '@rollup/plugin-html';
import { terser } from "rollup-plugin-terser";
import svgr from '@svgr/rollup'
import alias from '@rollup/plugin-alias';

import template from './viewTemplate/index'

const path = require('path')

const env = process.env.NODE_ENV;
const isProduction = env === 'production'
const bundlePath = './dist';

// configs

const outputConfig = {
    name: 'bundle',
    sourcemap: true,
    file: `${bundlePath}/index.js`,
    format: 'iife',
}

const babelConfig = {
    // exclude: 'node_modules/**',
    presets: [
        ['@babel/preset-react', { "runtime": "automatic" }]
    ],
    babelHelpers: 'bundled',
}

const nodeResolveConfig = {
    extensions: [".js"],
    browser: true,
}

const commonJsConfig = {
    include: 'node_modules/**',
    namedExports: {
        // This is needed because `react/jsx-runtime` exports `jsx` on the module export.
        // Without this mapping the transformed import `import {jsx as _jsx} from 'react/jsx-runtime'` will fail.
        'react/jsx-runtime': ['jsx', 'jsxs', 'Fragment'],
        'react/jsx-dev-runtime': ['jsxDEV', 'Fragment'],
        'node_modules/react-dom/index.js': ['unstable_batchedUpdates'],
        'node_modules/react/index.js': ['createElement', 'Component', 'useRef', 'useEffect', 'useState', 'useReducer', 'useDebugValue', 'useContext', 'useMemo', 'memo', 'useLayoutEffect'], // 'createElement' - resolves svg imports problem, 'Comsponent' - react router dom
        'node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer'] // resolves react router dom imports problem
    },
}

const postCssConfig = {
    extract: false,
    modules: true,
    // use: ['sass'],
}

const minificationConfig = {
    toplevel: true,
    mangle: true,
    compress: true
}

const aliases = {
    entries: {
        icons: path.resolve(__dirname, './src/icons'),
        components: path.resolve(__dirname, './src/components'),
        ui: path.resolve(__dirname, './src/ui'),
        routes: path.resolve(__dirname, './src/routes'),
        utils: path.resolve(__dirname, './src/utils'),
        store: path.resolve(__dirname, './src/store')
    }
}

const devServerConfig = {
    contentBase: bundlePath,
    openPage: '/',
    open: true,
    port: 8080,
    historyApiFallback: { index: 'index.html' },
}

export default {
    input: './src/index.js',
    output: outputConfig,
    plugins: [
        svgr(),
        replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
        babel(babelConfig),
        nodeResolve(nodeResolveConfig),
        commonjs(commonJsConfig),
        postcss(postCssConfig),
        alias(aliases),
        isProduction && terser(minificationConfig), // uglify-es is no longer maintained and uglify-js does not support ES6+.
        html({ template, title: 'ci interface' }),
        !isProduction && serve(devServerConfig)
    ],
};