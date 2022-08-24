module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:@next/next/recommended"],
  overrides: [
    {
      files: ["files/transformed/by/babel/*.js"],
      parser: "@babel/eslint-parser",
    },
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    sourceType: "module",
    allowImportExportEverywhere: false,
    ecmaVersion: "latest",
    jsx: true,
    ecmaFeatures: {
      globalReturn: false,
    },
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
  },
};
