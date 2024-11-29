module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    projectService: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          arguments: false,
        },
      },
    ],
  },
};
