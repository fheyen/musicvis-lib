module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended'
  ],
  plugins: [
    "jsdoc"
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    "jsdoc/no-undefined-types": 0,
    "jsdoc/check-tag-names": 1,
  }
}
