export default {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    semi: [2, 'never'],
    quotes: [2, 'single', { 'avoidEscape': true }],
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { semi: false }],
    'nuxt/no-cjs-in-config': 'off'
  },
  globals: {
    $nuxt: true
  }
}
