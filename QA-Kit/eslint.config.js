import javascriptESLint from '@eslint/js';
import reactHookESLintPlugin from 'eslint-plugin-react-hooks';
import reactRefreshESLintPlugin from 'eslint-plugin-react-refresh';
import globals from 'globals';
import typescriptESLint from 'typescript-eslint';

const eslintConfig = typescriptESLint.config(
    {
        ignores: ['node_modules/**', '@types/**', 'dist/**', 'reference/**', '*.config.js', '*.config.ts', '*.json']
    },
    javascriptESLint.configs.recommended,
    ...typescriptESLint.configs.strict,
    ...typescriptESLint.configs.stylistic,
    {
        plugins: {
            '@typescript-eslint': typescriptESLint.plugin,
            'react-hooks': reactHookESLintPlugin,
            'react-refresh': reactRefreshESLintPlugin
        },
        rules: {
            'array-bracket-newline': [
                'off'
            ],
            'array-bracket-spacing': [
                'error',
                'never'
            ],
            'array-element-newline': [
                'off'
            ],
            'arrow-parens': [
                'error',
                'always'
            ],
            'brace-style': [
                'error',
                'stroustrup',
                {
                    allowSingleLine: false
                }
            ],
            'comma-dangle': [
                'error',
                'never'
            ],
            'dot-location': [
                'error',
                'property'
            ],
            'eol-last': [
                'error',
                'never'
            ],
            'function-paren-newline': [
                'error',
                'consistent'
            ],
            'func-style': [
                'error',
                'declaration',
                {
                    allowArrowFunctions: false
                }
            ],
            'indent': [
                'error',
                4
            ],
            "jsx-quotes": ["error", "prefer-double"],
            'keyword-spacing': [
                'error',
                {
                    before: true,
                    after: true
                }
            ],
            'max-len': [
                'off',
                {
                    code: 200,
                    comments: 80
                }
            ],
            'multiline-ternary': ['error', 'always'],
            'newline-per-chained-call': [
                'error',
                {
                    ignoreChainWithDepth: 1
                }
            ],
            'no-console': ['error'],
            'no-multiple-empty-lines': [
                'error',
                {
                    max: 1
                }
            ],
            'no-multi-spaces': ['error'],
            'no-restricted-imports': [
                'error',
                {
                    patterns: ['../*', './*', '..']
                }
            ],
            'no-trailing-spaces': ['error'],
            'object-curly-newline': [
                'error',
                {
                    ImportDeclaration: {
                        minProperties: 5,
                        multiline: true
                    }
                }
            ],
            'object-curly-spacing': [
                'error',
                'always'
            ],
            'object-property-newline': [
                'error',
                {
                    'allowMultiplePropertiesPerLine': true
                }
            ],
            'operator-linebreak': [
                'error',
                'before'
            ],
            'quotes': [
                'error',
                'single'
            ],
            'semi': [
                'error',
                'always'
            ],
            'space-before-blocks': ['error', 'always'],
            'space-before-function-paren': [
                'error',
                'never'
            ],
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            'react-refresh/only-export-components': [
                'warn', {
                    allowConstantExport: true
                }
            ],
        },
    }
);

export default eslintConfig;