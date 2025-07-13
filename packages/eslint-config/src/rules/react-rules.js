/**
 * This is a copy from vercel's eslint style guide
 * https://github.com/vercel/style-guide/blob/main/eslint/rules/react.js
 */

/** @type {import('eslint').Linter.RulesRecord} */
export const reactRules = {
  /**
   * Require an explicit type when using button elements.
   *
   * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
   */
  "react/button-has-type": "error",
  /**
   * Require consistent function type for function components.
   *
   * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/function-component-definition.md
   */
  "react/function-component-definition": "error",
  /**
   * Require destructuring and symmetric naming of `useState` hook value and setter variables.
   *
   * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
   */
  "react/hook-use-state": "error",
  /**
   * Require consistent boolean attributes notation in JSX.
   *
   * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
   */
  "react/jsx-boolean-value": "error",
  /**
   * Disallow unnecessary curly braces in JSX props and children.
   *
   * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
   */
  "react/jsx-curly-brace-presence": "error",
  /**
   * Require using shorthand form for React fragments, unless required.
   *
   * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
   */
  "react/jsx-fragments": "error",
  /**
   * Prevent problematic leaked values from being rendered.
   *
   * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
   */
  "react/jsx-no-leaked-render": "error",
  /**
   * Prevents usage of unsafe `target='_blank'`.
   *
   * This rule is a part of `react/recommended`, but we've modified it to
   * allow referrer.
   *
   * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
   */
  "react/jsx-no-target-blank": [
    "error",
    {
      allowReferrer: true,
    },
  ],
  /**
   * Disallow empty React fragments.
   *
   * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
   */
  "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
  /**
   * Require the use of PascalCase for user-defined JSX components.
   *
   * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
   */
  "react/jsx-pascal-case": "error",
  /**
   * Disallow usage of Array index in keys.
   *
   * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
   */
  "react/no-array-index-key": "error",
  /**
   * Disallow creating unstable components inside components.
   *
   * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
   */
  "react/no-unstable-nested-components": "error",
  /**
   * Disallow closing tags for components without children.
   *
   * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
   */
  "react/self-closing-comp": "error",

  "react-hooks/exhaustive-deps": "error",
};
