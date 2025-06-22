import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

import prettierPlugin from 'eslint-plugin-prettier' // Integrates Prettier as ESLint plugin
import prettierConfig from 'eslint-config-prettier' // Disables ESLint rules that conflict with Prettier

import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import jsxAlly from 'eslint-plugin-jsx-a11y'
import sonarjs from 'eslint-plugin-sonarjs'
import promise from 'eslint-plugin-promise'
import node from 'eslint-plugin-node'
import jsdoc from 'eslint-plugin-jsdoc'

export default tseslint.config(
  { ignores: ['node_modules/', 'dist/', 'build/'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
      import: importPlugin,
      'unused-imports': unusedImports,
      'jsx-a11y': jsxAlly,
      sonarjs: sonarjs,
      promise: promise,
      node: node,
      jsdoc: jsdoc,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': 'error', // Treat formatting issues as ESLint errors
      'react-refresh/only-export-components': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'external',
              position: 'after',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
      'import/no-unresolved': 'off',

      //Clean up unused imports and vars
      'unused-imports/no-unused-imports': 'warn',

      // JSX accessibility
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',

      // SonarJS - cognitive complexity & duplication
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/no-identical-functions': 'warn',

      //Promise handling best practices
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'warn',

      // General JS/TS rules
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'no-console': ['error'],
      'node/prefer-global/process': ['off'],
      'node/no-process-env': ['error'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-function': 'warn',
      'no-alert': 'error',
      'no-magic-numbers': 'warn',
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none', varsIgnorePattern: '^_' }],

      // JSDoc rules
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
      'jsdoc/require-description': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
    },
  }
)
