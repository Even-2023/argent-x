module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-extra-semi": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-non-null-assertion": "error",
    curly: "error",
  },
}
