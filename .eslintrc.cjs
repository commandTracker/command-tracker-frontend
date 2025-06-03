module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  plugins: ["react", "prettier", "storybook", "import"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          { pattern: "next", group: "builtin", position: "before" },
          { pattern: "react", group: "builtin", position: "before" },
          { pattern: "@/components/**", group: "internal" },
          { pattern: "@/hooks/**", group: "internal" },
          { pattern: "@/util/**", group: "internal" },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "lf",
        useTabs: false,
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*.test.jsx", "**/*.test.js", "**/vite.config.js"],
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
      },
      alias: {
        map: [
          ["@", "./src"],
          ["@pages", "./src/pages"],
          ["@components", "./src/components"],
        ],
        extensions: [".js", ".jsx"],
      },
    },
  },
};
