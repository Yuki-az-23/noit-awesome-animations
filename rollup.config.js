import terser from '@rollup/plugin-terser';

const modules = ['scroll', 'hover', 'cursor', 'text', 'utils'];

/** Shared terser options for minification */
const minify = terser({
  compress: { passes: 2, drop_console: false },
  mangle: { toplevel: true },
  format: { comments: false }
});

/** Build a single sub-module (ESM + CJS) */
function subModule(name) {
  return {
    input: `src/${name}.js`,
    output: [
      {
        file: `dist/${name}.js`,
        format: 'es',
        sourcemap: true
      },
      {
        file: `dist/${name}.cjs`,
        format: 'cjs',
        exports: 'named',
        sourcemap: true
      }
    ],
    plugins: [minify]
  };
}

export default [
  // ── Full bundle (ESM) ──────────────────────────────────────────────────────
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/redbird.js',
        format: 'es',
        sourcemap: true
      },
      {
        file: 'dist/redbird.cjs',
        format: 'cjs',
        exports: 'named',
        sourcemap: true
      },
      // UMD build for CDN / <script> tag usage
      {
        file: 'dist/redbird.umd.min.js',
        format: 'umd',
        name: 'Redbird',
        sourcemap: true,
        plugins: [minify]
      }
    ],
    plugins: [minify]
  },
  // ── Per-module builds (for sub-path imports / tree-shaking) ───────────────
  ...modules.map(subModule)
];
