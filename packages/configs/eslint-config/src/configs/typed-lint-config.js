import ts from "typescript-eslint";
import { tsTypedRules } from "../rules/ts-typed-rules.js";

/**
 * Applies to files that require typed linting
 * https://typescript-eslint.io/getting-started/typed-linting/
 *
 * @param {Object} params - Configuration object
 * @param {string[]} params.files - Files to lint
 * @param {string} params.tsconfigRootDir - Root directory containing tsconfig
 * @returns {import('typescript-eslint').FlatConfig.Config}
 */
export function typedLintConfig(params) {
  const { files, tsconfigRootDir } = params;

  return ts.config({
    files,
    rules: {
      ...tsTypedRules,
    },
    name: "mooocha-eslint-typed-lint-config",
    extends: [ts.configs.recommendedTypeChecked, ts.configs.strictTypeChecked, ts.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir,
      },
    },
  });
}
