/** @type {import('eslint').Linter.RulesRecord} */
const tsDisabledRules = {
  /**
   * Reason to turn off:
   * This is an excellent rule, but it requires a massive refactor on codebase
   *
   * Require explicit return types on functions and class methods.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/explicit-function-return-type/
   */
  "@typescript-eslint/explicit-function-return-type": "off",
};

/**
 * This is a copy of vercel's eslint typescript rules.
 * https://github.com/vercel/style-guide/tree/main/eslint/rules/typescript
 *
 * NOTE: these rules don't require type checking
 */

/** @type {import('eslint').Linter.RulesRecord} */
export const tsRules = {
  /**
   * Require consistent usage of type imports.
   *
   * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-imports/
   */
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      disallowTypeAnnotations: true,
      fixStyle: "inline-type-imports",
      prefer: "type-imports",
    },
  ],

  /**
   * Require explicit return types on functions and class methods.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/explicit-function-return-type/
   */
  "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],

  /**
   * Require using function property types in method signatures.
   *
   * These have enhanced typechecking, whereas method signatures do not.
   *
   * 🔧 Fixable - https://typescript-eslint.io/rules/method-signature-style/
   */
  "@typescript-eslint/method-signature-style": "error",

  /**
   * Require consistent naming conventions.
   *
   * Improves IntelliSense suggestions and avoids name collisions.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/naming-convention/
   */
  "@typescript-eslint/naming-convention": [
    "error",
    // Anything type-like should be written in PascalCase.
    {
      format: ["PascalCase"],
      selector: ["typeLike", "enumMember"],
    },
    // Interfaces cannot be prefixed with `I`, or have restricted names.
    {
      custom: {
        match: false,
        regex: "^I[A-Z]|^(Interface|Props|State)$",
      },
      format: ["PascalCase"],
      selector: "interface",
    },
  ],

  /**
   * Require default parameters to be last.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/default-param-last/
   */
  "@typescript-eslint/default-param-last": "error",

  /**
   * Disallow creation of functions within loops.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/no-loop-func/
   */
  "@typescript-eslint/no-loop-func": "error",

  /**
   * Disallow variable declarations from shadowing variables declared in the
   * outer scope.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/no-shadow/
   */
  "@typescript-eslint/no-shadow": "error",

  /**
   * Variables that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring.
   * Such variables take up space in the code and can lead to confusion by readers.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/no-unused-vars/
   */
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      argsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      ignoreRestSiblings: true,
    },
  ],

  ...tsDisabledRules,
};
