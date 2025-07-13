import { globalIgnores } from "eslint/config";
import ts from "typescript-eslint";
import storybook from "eslint-plugin-storybook";
import { baseConfig } from "./configs/base-config.js";
import { reactConfig } from "./configs/react-config.js";
import { typedLintConfig } from "./configs/typed-lint-config.js";
import { unicornConfig } from "./configs/unicorn-config.js";
import { vitestConfig } from "./configs/vitest-config.js";
import { playwrightConfig } from "./configs/playwright-config.js";
import { nextjsConfig } from "./configs/nextjs-config.js";
import { importConfig } from "./configs/import-config.js";
import { defaultIgnores, srcTsFiles } from "./consts.js";

/**
 * @param {Object} params Configuration object
 * @param {string[]} [params.ignores] Array of file patterns to ignore, defaults to `[]`
 * @param {string[]} [params.sourceCodeFiles] Array of source code file patterns to lint, defaults to `srcTsFiles`
 * @param {string} [params.sourceCodeTsConfigRootDir] Root directory containing tsconfig.json for source code, need to be configured to enable typed linting; defaults to `null`
 * @param {string[]} [params.playwrightFiles] Array of Playwright test file patterns to lint, defaults to `[]`
 * @param {string[]} [params.nextjsFiles] Array of Next.js file patterns to lint, defaults to `[]`
 * @returns {import('typescript-eslint').FlatConfig.Config[]} Array of ESLint flat configs
 */
export function eslintConfig(params) {
  const {
    ignores = [],
    sourceCodeFiles = srcTsFiles,
    sourceCodeTsConfigRootDir = null,
    nextjsFiles = [],
    playwrightFiles = [],
  } = params ?? {};

  /**
   * if sourceCodeTsConfigRootDir is provided, add typed linting config
   */
  const sourceCodeConfig = (sourceCodeTsConfigRootDir && sourceCodeFiles?.length > 0)
    ? typedLintConfig({
        files: sourceCodeFiles,
        tsconfigRootDir: sourceCodeTsConfigRootDir,
      })
    : {};

  /**
   * if nextjsFiles is provided, add nextjs config
   */
  const nextConfig = nextjsFiles?.length > 0 ? nextjsConfig({ files: nextjsFiles }) : {};

  /**
   * if playwrightFiles is provided, add playwright config
   */
  const playwrightTestConfig = playwrightFiles?.length > 0 ? playwrightConfig({ files: playwrightFiles }) : {};

  return ts.config(
    baseConfig,
    reactConfig,
    importConfig,
    sourceCodeConfig,
    unicornConfig,
    vitestConfig,
    nextConfig,
    playwrightTestConfig,
    ...storybook.configs["flat/recommended"],
    globalIgnores([...defaultIgnores, ...ignores]),
  );
}
