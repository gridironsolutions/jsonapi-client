import del from 'rollup-plugin-delete';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import execute from 'rollup-plugin-execute';
import acf from 'acorn-class-fields';
import ascf from 'acorn-static-class-features';
import apm from 'acorn-private-methods';
import autoExternal from 'rollup-plugin-auto-external';
import pkg from "./package.json";

const input = ['src/index.js'];

const banner =
`/*
 * ${pkg.name}
 * ${pkg.description}
 * ${pkg.repository.url}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

const acornPlugins = [
    acf,
    ascf,
    apm,
];


export default [
    //UMD
    {
        input,
        output: {
            file: `build/${pkg.name}.min.js`,
            format: 'umd',
            name: 'jsonApiClient',
            esModule: false,
            exports: 'named',
            sourcemap: true,
            banner: banner,
        },
        plugins: [
            del({
                targets: 'build/*',
                runOnce: true,
            }),
            autoExternal(),
            nodeResolve({
                preferBuiltins: true,
            }),
            babel({
                babelHelpers: 'runtime',
            }),
            commonjs(),
            json(),
            terser({
                keep_classnames: true,
            }),
        ],
    },

    //ESM
    {
        input,
        output: [
            {
                file: `build/esm/index.js`,
                format: 'esm',
                exports: 'named',
                sourcemap: true,
                banner: banner,
            },
        ],
        plugins: [
            autoExternal(),
            nodeResolve({
                preferBuiltins: true,
            }),
            babel({
                babelHelpers: 'runtime',
            }),
            commonjs(),
            json(),
            terser({
                keep_classnames: true,
            }),
        ],
        acornInjectPlugins: acornPlugins
    },

    //CJS
    {
        input,
        output: [
            {
                file: `build/commonjs/index.js`,
                format: 'cjs',
                exports: 'named',
                sourcemap: true,
                banner: banner,
            },
        ],
        plugins: [
            autoExternal(),
            nodeResolve({
                preferBuiltins: true,
            }),
            babel({
                babelHelpers: 'runtime',
            }),
            commonjs(),
            json(),
            terser({
                keep_classnames: true,
            }),
            execute([
                'yarn version --patch --no-git-tag-version',
                'cp ./package.json ./build/package.json',
                'cp ./README.md ./build/README.md',
                'printf "{\n  \\"type\\": \\"commonjs\\"\n}" > ./build/commonjs/package.json',
            ]),        
        ],
        acornInjectPlugins: acornPlugins
    }
];