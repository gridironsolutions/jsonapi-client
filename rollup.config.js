import del from 'rollup-plugin-delete';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
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

export default {
    input,
    external: [ /@babel\/runtime/ ],

    plugins: [
        del({
            targets: 'build/*',
            runOnce: true,
        }),
        autoExternal(),
        json(),
        commonjs(),
        nodeResolve({ preferBuiltins: true }),
        babel({ babelHelpers: 'runtime' }),
        terser({ keep_classnames: true }),
        execute([
            'cp ./package.json ./build/package.json',
            'cp ./README.md ./build/README.md',
            'mkdir -p ./build/cjs',
            'printf "{\n  \\"type\\": \\"commonjs\\"\n}" > ./build/cjs/package.json',
        ]),
    ],
    
    output: [
        {
            file: 'build/esm/index.js',
            format: 'esm',
            exports: 'named',
            sourcemap: true,
            banner: banner,
        },
        {
            file: `build/cjs/index.js`,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            banner: banner,
        },
    ],

    acornInjectPlugins: [
        acf,
        ascf,
        apm,
    ]
}