import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
        },
        plugins: {
            jsdoc,
            prettier,
        },
        rules: {
            "prettier/prettier": "error",
            "jsdoc/require-jsdoc": [
                "error",
                {
                    require: {
                        FunctionDeclaration: true,
                        MethodDefinition: true,
                        ClassDeclaration: true,
                        ArrowFunctionExpression: true,
                        FunctionExpression: true,
                    },
                },
            ],
            "comma-dangle": "off",
            "indent": "off",
            "max-len": "off",
            // Add other ESLint rules as needed
        },
    },
    eslintConfigPrettier,
];
