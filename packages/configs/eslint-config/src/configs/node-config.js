import ts from "typescript-eslint";
import nodePlugin from "eslint-plugin-n";

export const nodeConfig = ts.config({
  name: "mooocha-eslint-node-config",
  extends: [nodePlugin.configs['flat/recommended']],
  rules: {
    /**
     * Reason to turn off:
     * Enabled by `eslint-plugin-n/recommended`, but are better handled by TypeScript
     *
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-missing-import.md
     */
    'n/no-missing-import': 'off',
  },
});
