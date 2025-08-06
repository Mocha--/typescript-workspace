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

    /**
     * Reason to turn off:
     * This rule is deprecated. It was replaced by [n/hashbang](https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/hashbang.md)
     *
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/shebang.md
     */
    'n/shebang': 'off',

    /**
     * Reason to turn off:
     * We use shebang in the CLI to run the script
     * This rule is not compatible with typescript compilation
     *
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/hashbang.md
     */
    'n/hashbang': 'off',
  },
});
