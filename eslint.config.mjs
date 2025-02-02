import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      semi: ["error"],
      quotes:  ["error", "double", { avoidEscape: true }],
      indent: ["error", 2],
      "quote-props": ["error", "as-needed"],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "no-trailing-spaces": ["error", { ignoreComments: true }],
      "object-curly-spacing": ["error", "always"],
      "react/jsx-indent": ["error", 2],
      "react/jsx-indent-props": ["error", 2],
      "react/jsx-one-expression-per-line": ["error"],
      "react/jsx-first-prop-new-line": ["error", "multiline"],
      "react/jsx-max-props-per-line": ["error", { maximum: 1, when: "always" }],
      "react/jsx-closing-bracket-location": [
        "error",
        { selfClosing: "line-aligned", nonEmpty: "line-aligned" }
      ]
    }
  })
];

export default eslintConfig;
