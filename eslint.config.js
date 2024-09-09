const js = require("@eslint/js");
const prettierConfig = require("eslint-config-prettier");
const tseslint = require("typescript-eslint");

module.exports = [
	js.configs.recommended,
	...tseslint.configs.recommended,
	prettierConfig,
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 2021,
				sourceType: "module",
				project: "./tsconfig.json"
			}
		},
		plugins: {
			"@typescript-eslint": tseslint.plugin,
			prettier: require("eslint-plugin-prettier"),
			import: require("eslint-plugin-import"),
			jest: require("eslint-plugin-jest")
		},
		settings: {
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./tsconfig.json"
				},
				node: true
			}
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"import/no-unresolved": "off", // Disable this rule
			"import/default": "off",
			"spaced-comment": "error",
			"no-duplicate-imports": "error",
			"no-control-regex": "off",
			strict: 0,
			"react-hooks/exhaustive-deps": "off"
		}
	}
];
