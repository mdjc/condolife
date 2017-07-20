module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true,
    "commonjs": true,
    "es6": true,
    "jquery": true
  },

  "plugins": [
    "dollar-sign"
  ],
  
  "rules": {
    "dollar-sign/dollar-sign": [2, "ignoreProperties"]
  }
};
