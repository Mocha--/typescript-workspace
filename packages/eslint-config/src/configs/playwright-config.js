import ts from "typescript-eslint";
import playwright from "eslint-plugin-playwright";

/**
 * Applies to Playwright test files only
 *
 * @param {Object} params - Configuration object
 * @param {string[]} params.files - Files to lint
 * @returns {import('typescript-eslint').FlatConfig.Config}
 */
export function playwrightConfig(params) {
  const { files } = params;

  return ts.config({
    files,
    name: "mooocha-eslint-playwright-config",
    extends: [playwright.configs["flat/recommended"]],
  });
}
