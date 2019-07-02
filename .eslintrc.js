module.exports = {
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	globals: {
		describe: false,
		test: false,
		expect: false,
		it: false,
		fetch: false
	},
	extends: [
		'eslint:recommended'
	],
	env: {
		node: true,
		es6: true
	},
	rules: {
		'brace-style': 2,
		camelcase: 2,
		'class-methods-use-this': 2,
		'comma-dangle': 2,
		'comma-spacing': 2,
		'dot-notation': 2,
		eqeqeq: 2,
		indent: [2, 'tab', {SwitchCase: 1}],
		'key-spacing': 2,
		'keyword-spacing': [2, {overrides: {
			if: {after: false},
			catch: {after: false},
			switch: {after: false}
		}}],
		'lines-between-class-members': 2,
		'max-len': [2, 200, 2],
		'newline-per-chained-call': [2, {ignoreChainWithDepth: 3}],
		'no-console': 0,
		'no-multiple-empty-lines': 2,
		'no-param-reassign': 2,
		'no-shadow': 2,
		'no-unneeded-ternary': [2, {defaultAssignment: false}],
		'no-unused-expressions': 2,
		'no-var': 2,
		'object-shorthand': 2,
		'padded-blocks': [2, 'never'],
		'prefer-const': 2,
		'prefer-arrow-callback': 2,
		'quote-props': [2, 'as-needed'],
		quotes: [2, 'single'],
		'require-await': 2,
		semi: [2, 'always'],
		'space-before-function-paren': [2, {anonymous: 'always', named: 'never'}],
		'space-infix-ops': 2,
		strict: 2,
		yoda: 2
	}
};
