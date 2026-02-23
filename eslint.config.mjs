import js from '@eslint/js'

import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import tailwindcssPlugin from 'eslint-plugin-tailwindcss'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		ignores: [
			'**/node_modules/**',
			'node_modules/**',
			'**/.next/**',
			'.next/**',
			'**/out/**',
			'out/**',
			'**/build/**',
			'build/**',
			'**/dist/**',
			'dist/**',
			'*.config.js',
			'*.config.ts',
			'*.config.mjs',
			'*.config.cjs'
		]
	},
	js.configs.recommended,
	...tseslint.configs.recommended,

	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			tailwindcss: tailwindcssPlugin,
			'unused-imports': unusedImportsPlugin,
			import: importPlugin
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: {jsx: true},
				ecmaVersion: 2022,
				sourceType: 'module',
				project: './tsconfig.json'
			}
		},
		settings: {
			react: {version: 'detect'},
			next: {rootDir: './'},
			'import/resolver': {
				typescript: {project: './tsconfig.json'}
			}
		},
		rules: {
			// Import rules
			'import/default': 0,
			'import/first': 2,
			'import/newline-after-import': 2,
			'import/no-duplicates': 2,
			'import/no-named-as-default-member': 2,
			'import/no-unresolved': 0,
			'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown', 'type'],
					pathGroups: [{pattern: '@/**', group: 'internal'}],
					'newlines-between': 'always',
					alphabetize: {order: 'asc', caseInsensitive: true},
					warnOnUnassignedImports: true,
					pathGroupsExcludedImportTypes: ['type']
				}
			],

			// React rules
			'react/prop-types': 0,
			'react/jsx-curly-brace-presence': ['error', {props: 'always', children: 'always'}],
			'react/jsx-closing-tag-location': 2,
			'react/jsx-max-props-per-line': 'off',

			// React Hooks rules
			'react-hooks/exhaustive-deps': ['warn', {additionalHooks: '(^useAsyncTrigger$|^useDeepCompareMemo$)'}],

			// General rules
			'no-async-promise-executor': 0,
			'no-else-return': ['error', {allowElseIf: false}],
			'no-unused-vars': 'off', // Turned off in favor of @typescript-eslint version
			curly: ['error', 'all'],
			'sort-imports': [
				'error',
				{
					ignoreCase: false,
					ignoreDeclarationSort: true,
					ignoreMemberSort: false,
					memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
					allowSeparatedGroups: true
				}
			],
			'object-shorthand': 'error',
			eqeqeq: 'error',
			'default-case': 'error',

			// TypeScript rules
			'@typescript-eslint/consistent-type-imports': [
				2,
				{
					prefer: 'type-imports',
					disallowTypeAnnotations: true,
					fixStyle: 'separate-type-imports'
				}
			],
			'@typescript-eslint/no-var-requires': 0,
			'@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
			'@typescript-eslint/no-explicit-any': [1],

			'@typescript-eslint/no-unsafe-function-type': 'error',
			'@typescript-eslint/array-type': ['error', {default: 'array'}],
			'@typescript-eslint/consistent-type-assertions': 0,
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'default',
					format: ['camelCase', 'PascalCase'],
					filter: {
						regex: '^(@typescript-eslint/|react/|react-hooks/|no-|import/|object-|array-|eol-|tailwindcss/|unused-imports/|sort-|newlines-between|brace-style|comma-dangle).*$',
						match: false
					}
				},
				{selector: 'function', format: ['camelCase', 'PascalCase']},
				{
					selector: 'variableLike',
					format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
					leadingUnderscore: 'allow'
				},
				{
					selector: 'variable',
					types: ['boolean'],
					format: ['PascalCase'],
					prefix: ['is', 'are', 'should', 'has', 'can', 'did', 'will', 'with', 'was', 'only']
				},
				{
					selector: 'variableLike',
					format: ['PascalCase'],
					filter: {regex: '(Context)$|(ContextApp)$|^Component$', match: true}
				},
				{selector: ['typeParameter', 'typeAlias'], format: ['PascalCase'], prefix: ['T']},
				{selector: 'interface', format: ['PascalCase'], prefix: ['I']}
			],
			'@typescript-eslint/no-misused-promises': ['error', {checksConditionals: true, checksVoidReturn: false}],
			'@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
			'@typescript-eslint/no-unnecessary-qualifier': 'error',
			'@typescript-eslint/no-unnecessary-type-arguments': 'error',
			'@typescript-eslint/no-unnecessary-boolean-literal-compare': [
				'error',
				{
					allowComparingNullableBooleansToTrue: false,
					allowComparingNullableBooleansToFalse: false
				}
			],
			'@typescript-eslint/prefer-for-of': 'error',
			'@typescript-eslint/prefer-function-type': 'error',
			'@typescript-eslint/prefer-includes': 'error',
			'@typescript-eslint/promise-function-async': 'error',
			'@typescript-eslint/require-array-sort-compare': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error',

			// Unused imports rules
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'error',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_'
				}
			],

			// Tailwind rules
			'tailwindcss/no-custom-classname': 0

			// Next.js rules - using Next.js built-in ESLint config instead
		}
	},

	// Prettier last — disables all ESLint formatting rules that conflict, then enforces Prettier as a single rule
	prettierPlugin,
	{
		rules: {
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					semi: false,
					trailingComma: 'es5',
					printWidth: 120
				}
			]
		}
	}
)
