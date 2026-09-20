import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    ...reactHooks.configs['recommended-latest'],
  },
  {
    files: ['**/*.{js,jsx}'],
    plugins: { react },
    rules: { 'react/jsx-uses-vars': 'error' },
  },
  {
    files: ['**/*.{js,jsx}'],
    ...reactRefresh.configs.vite,
  },
]
