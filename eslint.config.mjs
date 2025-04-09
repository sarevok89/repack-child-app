import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      prettier: pluginPrettier,
      import: pluginImport,
      'simple-import-sort': pluginSimpleImportSort,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/no-empty-function': 'warn',
      'react/prop-types': 'warn',
      'react/no-unused-prop-types': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['./gesture-handler', '^react', '^react-native', '^@?\\w'], ['^[./]']],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
