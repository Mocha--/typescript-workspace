import ts from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import { importRules } from "../rules/import-rules.js";

export const importConfig = ts.config({
  name: "mooocha-eslint-import-config",
  extends: [importPlugin.flatConfigs.recommended],
  rules: {
    ...importRules,
  },
});
