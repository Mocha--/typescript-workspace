import ts from "typescript-eslint";
import nodePlugin from "eslint-plugin-n";

export const nodeConfig = ts.config({
  name: "mooocha-eslint-node-config",
  extends: [nodePlugin.configs['flat/recommended']],
});
