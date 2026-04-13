import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import gitInfo from 'rollup-plugin-git-info';
import serve from 'rollup-plugin-serve';
import styles from 'rollup-plugin-styler';
import svgo from 'rollup-plugin-svgo';
import { visualizer } from 'rollup-plugin-visualizer';

const watch = process.env.ROLLUP_WATCH === 'true' || process.env.ROLLUP_WATCH === '1';
const dev = watch || process.env.DEV === 'true' || process.env.DEV === '1';
const packageInfo = JSON.parse(readFileSync('./package.json', 'utf8'));

/**
 * @type {import('rollup-plugin-serve').ServeOptions}
 */
const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 10001,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const hasGitHead = (() => {
  try {
    execSync('git rev-parse HEAD', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

const gitAbbrevHash = hasGitHead
  ? execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
  : '';
const gitDate = hasGitHead
  ? execSync('git show -s --format=%cI HEAD', { encoding: 'utf8' }).trim()
  : '';
const buildDate = hasGitHead ? new Date().toISOString() : '';

/**
 * @type {import('rollup').RollupOptions['plugins']}
 */
const plugins = [
  ...(hasGitHead
    ? [gitInfo.default({ enableBuildDate: true, updateVersion: false })]
    : []),
  styles({
    modules: false,
    // Behavior of inject mode, without actually injecting style
    // into <head>.
    mode: ['inject', () => undefined],
    sass: {
      includePaths: ['./node_modules/'],
    },
  }),
  svgo(),
  image({ exclude: '**/*.svg' }),
  nodeResolve({
    browser: true,
  }),
  commonjs({
    include: 'node_modules/**',
    sourceMap: false,
  }),
  typescript({
    sourceMap: dev,
    inlineSources: dev,
    exclude: ['dist/**', 'tests/**/*.test.ts'],
  }),
  json(),
  replace({
    preventAssignment: true,
    values: {
      'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
      __ADVANCED_CAMERA_CARD_RELEASE_VERSION__:
        process.env.RELEASE_VERSION ?? (dev ? 'dev' : 'pkg'),
      __ADVANCED_CAMERA_CARD_PACKAGE_VERSION__: JSON.stringify(packageInfo.version),
      __ADVANCED_CAMERA_CARD_GIT_ABBREV_HASH__: JSON.stringify(gitAbbrevHash),
      __ADVANCED_CAMERA_CARD_BUILD_DATE__: JSON.stringify(buildDate),
      __ADVANCED_CAMERA_CARD_GIT_DATE__: JSON.stringify(gitDate),
    },
  }),
  watch && serve(serveopts),
  !dev && terser(),
  visualizer({
    filename: 'visualizations/treemap.html',
    template: 'treemap',
  }),
];

const outputEntryTemplate = {
  entryFileNames: '[name].js',
  dir: 'dist',
  chunkFileNames: (chunk) => {
    // Add "lang-" to the front of the language chunk names for readability.
    if (
      chunk.facadeModuleId &&
      chunk.facadeModuleId.match(/localize\/languages\/.*\.json/)
    ) {
      return 'lang-[name]-[hash].js';
    }
    return '[name]-[hash].js';
  },
  format: 'es',
  sourcemap: dev,
};

const CIRCULAR_DEPENDENCY_IGNORE_REGEXP = /(ha-nunjucks|ts-py-datetime)/;

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: {
    'advanced-camera-card-mini': 'src/card.ts',
    'advanced-camera-card-mini-ultra': 'src/card-ultra.ts',
  },
  // Specifically want a facade created as HACS will attach a hacstag
  // queryparameter to the resource. Without a facade when chunks re-import the
  // card chunk, they'll refer to a 'different' copy of the card chunk without
  // the hacstag, causing a re-download of the same content and functionality
  // problems.
  preserveEntrySignatures: 'strict',
  output: [outputEntryTemplate],
  plugins: plugins,
  // These files use `this` at the toplevel, which causes rollup warning spam on
  // build: `this` has been rewritten to `undefined`.
  moduleContext: {
    './node_modules/@formatjs/intl-utils/lib/src/diff.js': 'window',
    './node_modules/@formatjs/intl-utils/lib/src/resolve-locale.js': 'window',
  },
  // Ignore circular dependencies from underlying libraries.
  onwarn: (warning, defaultHandler) => {
    if (
      warning.code === 'CIRCULAR_DEPENDENCY' &&
      warning.ids.some((id) => id.match(CIRCULAR_DEPENDENCY_IGNORE_REGEXP))
    ) {
      return;
    }
    defaultHandler(warning);
  },
};

export default config;
