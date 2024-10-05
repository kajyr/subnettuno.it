import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends(
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ),
  {
    languageOptions: {
      ecmaVersion: 6,

      globals: {
        ...globals.amd,
        ...globals.browser,
        ...globals.node,
        __VERSION__: true,
      },
      parserOptions: {
        ecmaFeatures: {
          experimentalObjectRestSpread: true,
        },
      },

      sourceType: 'module',
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier,
      'sort-keys-fix': sortKeysFix,
    },

    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-namespace': 0,
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-var-requires': 0,
      eqeqeq: ['error', 'smart'],
      'sort-keys-fix/sort-keys-fix': 'warn',
    },

    settings: {
      react: {
        version: '18',
      },
    },
  },
  {
    ignores: [
      '**/node_modules',
      '**/public',
      '**/.cache',
      '**/dist',
      '**/web/**',
    ],
  },
];
