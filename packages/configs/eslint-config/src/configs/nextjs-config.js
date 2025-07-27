import ts from "typescript-eslint";
import nextjs from "@next/eslint-plugin-next";

/**
 * @param {Object} params Configuration object
 * @param {string[]} params.files Files to lint
 * @returns {import('typescript-eslint').FlatConfig.Config}
 */
export function nextjsConfig(params) {
  const { files } = params;

  return ts.config({
    files,
    name: "mooocha-eslint-nextjs-config",
    extends: [nextjs.flatConfig.recommended],
  });
}
