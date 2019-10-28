import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import sourceMaps from 'rollup-plugin-sourcemaps';
import serve from 'rollup-plugin-serve';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import alias from 'rollup-plugin-alias';
import path from 'path';
import pkg from './package.json';

const pathResolve = p => path.resolve(__dirname, p);

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'build/js/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'build/js/bundle.umd.js',
      format: 'umd'
    },
    {
      file: 'build/js/bundle.es.js',
      format: 'es'
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
  ],
  plugins: [
    commonjs(),
    resolve(),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    babel({
      exclude: [
        'node_modules/**',
        'build'
      ], 
      runtimeHelpers: true,  // 配置runtime，不设置会报错
      // extensions: [
      //   ...DEFAULT_EXTENSIONS, // 默认解析.js,.jsx,.es6,.es,.mjs类型的文件
      //   '.ts',
      //   '.tsx'
      // ]
    }),
    sourceMaps(),
    serve({  // dev serve
      open: true, // 是否打开浏览器
      contentBase: './', // 入口html的文件位置
      historyApiFallback: true, // Set to true to return index.html instead of 404
      host: 'localhost',
      port: 10001
    }),
    replace({
      // include: 'src/index.js', 
      // exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    alias({
      'src': pathResolve('src'),
      'component': pathResolve('src/component'),
    }),
    livereload(),  // 与rollup-plugin-serve配合实现模块热更新
  ]
};