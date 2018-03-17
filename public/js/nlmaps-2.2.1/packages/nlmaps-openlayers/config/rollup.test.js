// Rollup plugins
import babel from '../../../node_modules/rollup-plugin-babel/dist/rollup-plugin-babel.es.js';
import eslint from 'rollup-plugin-eslint';
import resolve from '../../../node_modules/rollup-plugin-node-resolve/dist/rollup-plugin-node-resolve.es.js';
import commonjs from '../../../node_modules/rollup-plugin-commonjs/dist/rollup-plugin-commonjs.es.js';
import replace from '../../../node_modules/rollup-plugin-replace/dist/rollup-plugin-replace.es.js';
import uglify from 'rollup-plugin-uglify';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  entry: 'test/browser-test.js',
  format: 'iife',
  moduleName: 'testing',
  dest: 'build/browser-test.js',
  plugins: [
    commonjs(),
    globals(),
    builtins(),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    eslint({
      exclude: [
        '../../../node_modules/**'
      ]
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.browser': JSON.stringify(!!process.env.BROWSER)
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ]
}
