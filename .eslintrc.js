module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@next/next/recommended",
  ],
  overrides: [],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: false,
    },
  },
  plugins: ["react"],
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
};
