import ts from "typescript-eslint";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import reactCompiler from "eslint-plugin-react-compiler";
import { jsxFiles } from "../consts.js";
import { reactRules } from "../rules/react-rules.js";

export const reactConfig = ts.config({
  files: jsxFiles,
  name: "mooocha-eslint-react-config",
  extends: [
    react.configs.flat.recommended,
    react.configs.flat["jsx-runtime"],
    jsxA11y.flatConfigs.recommended,
    jsxA11y.flatConfigs.strict,
    reactRefresh.configs.recommended,
    reactHooks.configs["recommended-latest"],
    reactCompiler.configs.recommended,
  ],
  rules: {
    ...reactRules,
  },
  /**
   * https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#configuration-legacy-eslintrc-
   *
   * Without react.version: 'detect', eslint throws warnings
   * But it is not documented in Flat Config, no idea why it is still needed
   */
  settings: {
    react: {
      version: "detect",
    },
  },
});
