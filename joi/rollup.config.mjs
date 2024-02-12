import terser from "@rollup/plugin-terser";
import autoprefixer from "autoprefixer";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import nodeResolve from "rollup-plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import tailwindcss from "tailwindcss";

import pkg from "./package.json" assert { type: "json" };

import tailwindConfig from "./tailwind.config.js";

export default [
  {
    input: `./src/index.ts`,
    treeshake: true,
    output: [
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      json(),
      terser(),
      peerDepsExternal(),
      commonjs(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      postcss({
        plugins: [autoprefixer(), tailwindcss(tailwindConfig)],
        sourceMap: true,
        use: ["sass"],
        minimize: true,
        extract: "style/joi.css",
      }),
    ],
    watch: {
      clearScreen: false,
    },
    external: [
      "react",
      "react-dom",
      "tailwindcss",
      "class-variance-authority",
      "react-resizable-panels",
    ],
  },
];
