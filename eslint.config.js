const js = require("@eslint/js");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
	js.configs.recommended,
	prettierConfig,
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: require("@typescript-eslint/parser"),
			parserOptions: {
				ecmaVersion: 2021,
				sourceType: "module"
			}
		},
		plugins: {
			"@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
			prettier: require("eslint-plugin-prettier"),
			import: require("eslint-plugin-import"),
			jest: require("eslint-plugin-jest")
		},
		rules: {
			// Convert your existing rules here
			"no-foreach/no-foreach": "off",
			"react/prop-types": "off",
			"react/display-name": "off",
			"no-use-before-define": "off",
			"no-shadow": "off",
			"import/prefer-default-export": "off",
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-inferrable-types": "off",
			"import/no-unresolved": ["error"],
			"import/default": ["off"],
			"spaced-comment": "error",
			"no-duplicate-imports": "error",
			"no-control-regex": "off",
			strict: 0,
			"react-hooks/exhaustive-deps": "off"
		}
	}
];
