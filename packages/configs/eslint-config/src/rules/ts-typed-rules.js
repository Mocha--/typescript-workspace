/** @type {import('eslint').Linter.RulesRecord} */
const customRules = {
  /**
   * Reason to customize:
   * This allow to use async function in a callback function which requires a void return
   *
   * ```
   * const intervalId = setInterval(async () => {
   *  // do something
   * }, 1000);
   * ```
   *
   * Disallow misused promises.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/no-misused-promises/
   */
  "@typescript-eslint/no-misused-promises": ["error", {
    checksVoidReturn: false,
  }],
};

/**
 * This is a copy of vercel's eslint typescript rules.
 * https://github.com/vercel/style-guide/tree/main/eslint/rules/typescript
 *
 * NOTE: these rules DO require type checking
 */

/** @type {import('eslint').Linter.RulesRecord} */
export const tsTypedRules = {
  /**
   * Require consistent usage of type exports.
   *
   * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-exports/
   */
  "@typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],

  /**
   * Disallow unnecessary namespace qualifiers.
   *
   * 🔧 Fixable - https://typescript-eslint.io/rules/no-unnecessary-qualifier/
   */
  "@typescript-eslint/no-unnecessary-qualifier": "error",

  /**
   * Require exhaustive checks when using union types in switch statements.
   *
   * This ensures cases are considered when items are later added to a union.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/switch-exhaustiveness-check/
   */
  "@typescript-eslint/switch-exhaustiveness-check": "error",

  /**
   * Require Array#sort calls to provide a compare function.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/require-array-sort-compare/
   */
  "@typescript-eslint/require-array-sort-compare": ["error", { ignoreStringArrays: true }],

  ...customRules,
};
