import es from "@eslint/js";
import ts from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import { allJsAndTsFiles } from "../consts.js";
import { esRules } from "../rules/es-rules.js";
import { tsRules } from "../rules/ts-rules.js";

const stylisticConfig = stylistic.configs.customize({
  semi: true,
  indent: 2,
  quotes: "single",
  jsx: true,
  arrowParens: true,
  braceStyle: "1tbs",
  quoteProps: "as-needed",
});

/**
 * Applies to all JavaScript and TypeScript files.
 */
export const baseConfig = ts.config({
  files: allJsAndTsFiles,
  rules: {
    ...esRules,
    ...tsRules,
  },
  name: "mooocha-eslint-base-config",
  extends: [es.configs.recommended, ts.configs.recommended, ts.configs.strict, ts.configs.stylistic, stylisticConfig],
});
