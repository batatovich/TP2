import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import next from "eslint-config-next";

export default [
  js.configs.recommended,
  react.configs.recommended,
  next,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];
