import nodeResolve from 'rollup-plugin-node-resolve';
import typescriptPlugin from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import sourceMaps from 'rollup-plugin-sourcemaps';
import serve from 'rollup-plugin-serve';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import alias from 'rollup-plugin-alias';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path from 'path';

import { DEFAULT_EXTENSIONS } from '@babel/core';
import pkg from './package.json';

const pathResolve = p => path.resolve(__dirname, p);
console.log(Object.keys(pkg.dependencies || {}));

export default {
  input: 'src/index.ts',
  output: [
    // {
    //   file: 'build/js/bundle.cjs.js',
    //   format: 'cjs'
    // },
    {
      file: 'build/js/bundle.umd.js',
      format: 'umd',
      // sourceMap: true
    }
    // {
    //   file: 'build/js/bundle.es.js',
    //   format: 'es'
    // },
    // {
    //   file: 'build/js/bundle.iife.js',
    //   format: 'iife'
    // }
  ],
  // external: [
  //   ...Object.keys(pkg.dependencies || {}),
  // ],
  plugins: [
    nodeResolve(),
    commonjs({
      // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
      include: 'node_modules/**',
      namedExports: {
          // The commonjs plugin can't figure out the exports of some modules, so if rollup gives warnings like:
          // ⚠️   'render' is not exported by 'node_modules/react-dom/index.js'
          // Just add the mentioned file / export here
          'node_modules/react-dom/index.js': [
              'render',
          ],
          'node_modules/react/index.js': [
              'Component',
              'PropTypes',
              'createElement',
          ],
      },
    }),
    // typescriptPlugin(),
    babel({
      exclude: [
        'node_modules/**/*',
      ], 
      runtimeHelpers: true,  // 配置runtime，不设置会报错
      extensions: [
        ...DEFAULT_EXTENSIONS, // 默认解析.js,.jsx,.es6,.es,.mjs类型的文件
        '.ts',
        '.tsx'
      ]
    }),
    // postcss({
    //   plugins: [autoprefixer, cssnano],
    //   extract: 'build/css/bundle.css' // 输出路径
    // }),
    sourceMaps(),
    serve({  // dev serve
      open: true, // 是否打开浏览器
      // contentBase: pathResolve('.'), // Folder to serve files from
      contentBase: [pathResolve('./src'), pathResolve('.')], // Folder to serve files from
      historyApiFallback: true, // Set to true to return index.html instead of 404
      host: 'localhost',
      port: 10001
    }),
    replace({
      'ENV': JSON.stringify(process.env.NODE_ENV || 'dev'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    alias({
      'src': pathResolve('src'),
    }),
    livereload(),  // 与rollup-plugin-serve配合实现模块热更新
  ]
};