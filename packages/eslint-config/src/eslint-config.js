import { dirname } from "node:path";
import { globalIgnores } from "eslint/config";
import { loadESLint } from "eslint";
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
 * @param {string} [params.sourceCodeTsConfigRootDir] Root directory containing tsconfig.json for source code, need to be configured to enable typed linting; defaults to the directory containing the ESLint config file
 * @param {string[]} [params.playwrightFiles] Array of Playwright test file patterns to lint, defaults to `[]`
 * @param {string[]} [params.nextjsFiles] Array of Next.js file patterns to lint, defaults to `[]`
 * @returns {import('typescript-eslint').FlatConfig.Config[]} Array of ESLint flat configs
 */
export function eslintConfig(params) {
  const eslintConfigDir = getESLintConfigDir();

  const {
    ignores = [],
    sourceCodeFiles = srcTsFiles,
    sourceCodeTsConfigRootDir = eslintConfigDir,
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

/**
 * Get the directory containing the ESLint configuration file.
 * @returns {Promise<string>} The absolute path to the directory containing the ESLint config file
 */
async function getESLintConfigDir() {
  const ESLint = await loadESLint({
    useFlatConfig: true
  });
  const eslint = new ESLint();
  const configFilePath = await eslint.findConfigFile();
  return dirname(configFilePath);
}