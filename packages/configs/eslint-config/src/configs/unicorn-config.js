import ts from "typescript-eslint";
import globals from "globals";
import unicorn from "eslint-plugin-unicorn";

/**
 * https://www.npmjs.com/package/eslint-plugin-unicorn#preset-configs
 */
export const unicornConfig = ts.config({
  name: "mooocha-eslint-unicorn-config",
  languageOptions: {
    globals: globals.builtin,
  },
  plugins: {
    unicorn,
  },
  rules: {
    /**
     * Require consistent filename case for all linted files.
     *
     * 🚫 Not fixable - https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
     */
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
      },
    ],

    /**
     * Require using the `node:` protocol when importing Node.js built-in modules.
     *
     * 🔧 Fixable - https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
     */
    "unicorn/prefer-node-protocol": "error",
  },
});
