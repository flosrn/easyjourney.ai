module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: [
    "react",
    "github",
    "@typescript-eslint",
    "json-format",
    "promise",
    "import",
    "unicorn",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict",
    "next/core-web-vitals",
    "plugin:github/recommended",
    "plugin:import/recommended",
    "plugin:unicorn/recommended",
    "plugin:tailwindcss/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  globals: {
    JSX: true,
    GLOBAL_APP_COLOR_THEME: true,
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    "func-style": ["error", "expression"],
    "no-extra-semi": "error",
    "default-case": "error",
    camelcase: 0,
    "no-async-promise-executor": "error",
    "no-await-in-loop": "error",
    "no-console": "warn",
    "no-misleading-character-class": "error",
    "no-multi-assign": "error",
    "no-multi-str": "error",
    "no-nested-ternary": "error",
    "no-new": "error",
    "no-new-object": "error",
    "no-new-symbol": "error",
    "no-new-wrappers": "error",
    "no-obj-calls": "error",
    "no-path-concat": "error",
    "no-return-await": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow-restricted-names": "error",
    "no-sparse-arrays": "error",
    "no-tabs": "error",
    "no-template-curly-in-string": "error",
    "no-this-before-super": "error",
    "prefer-numeric-literals": "error",
    "prefer-object-spread": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "symbol-description": "error",
    "no-unreachable-loop": "error",
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-base-to-string": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-dynamic-delete": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-implicit-any-catch": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-qualifier": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/sort-type-union-intersection-members": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/brace-style": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/default-param-last": "error",
    "react/no-unescaped-entities": 0,
    "filenames/match-regex": 0,
    "github/no-then": 0,
    "eslint-comments/no-use": 0,
    "import/default": "error",
    "import/no-namespace": 0,
    "prettier/prettier": 0,
    "i18n-text/no-en": 0,
    "no-empty-pattern": 0,
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: true,
        types: {
          "{}": false,
        },
      },
    ],
    "import/no-duplicates": "error",
    "@next/next/no-img-element": 0,
    "@next/next/no-html-link-for-pages": ["error", "app"],
    "unicorn/prevent-abbreviations": 0,
    "unicorn/prefer-top-level-await": 0,
    "unicorn/no-process-exit": 0,
    "unicorn/no-null": 0,
    "unicorn/consistent-function-scoping": 0,
    "unicorn/prefer-code-point": 0,
    "unicorn/numeric-separators-style": 0,
    "unicorn/switch-case-braces": 0,
    "unicorn/no-useless-undefined": 0,
    "unicorn/no-useless-promise-resolve-reject": 0,
    "unicorn/filename-case": 0,
  },
};
