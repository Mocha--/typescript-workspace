import ts from "typescript-eslint";
import vitest from "eslint-plugin-vitest";

export const vitestConfig = ts.config({
  name: "mooocha-eslint-vitest-config",
  files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
  plugins: {
    vitest,
  },
  extends: [vitest.configs.recommended],
  /**
   * https://github.com/vercel/style-guide/blob/main/eslint/rules/vitest.js
   */
  rules: {
    /**
     * Disallow duplicate setup and teardown hooks.
     *
     * 🚫 Not fixable - https://github.com/veritem/eslint-plugin-vitest/blob/HEAD/docs/rules/no-duplicate-hooks.md
     */
    "vitest/no-duplicate-hooks": "error",

    /**
     * Require lowercase test names.
     *
     * 🔧 Fixable - https://github.com/veritem/eslint-plugin-vitest/blob/HEAD/docs/rules/prefer-lowercase-title.md
     */
    "vitest/prefer-lowercase-title": "error",
  },
});
