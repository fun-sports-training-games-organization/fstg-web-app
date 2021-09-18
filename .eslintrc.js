module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['unused-imports'],
    extends: [
        'react-app',
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last config in the extends array.
    ],
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module' // Allows for the use of imports
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        curly: 'error',
        semi: 'error',
        'react/prop-types': 'off',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 2,
        'unused-imports/no-unused-vars': 1,
        camelcase: 'off',
        'prettier/prettier': 'warn',
        '@typescript-eslint/camelcase': ['off'], // turn camelcase checking off for now...
        'no-use-before-define': 'off', // https://stackoverflow.com/a/64024916/1892214
        '@typescript-eslint/no-use-before-define': ['error']
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    overrides: [
        {
            files: ['*.test.ts', '*.test.tsx'],
            globals: {
                shallow: true,
                render: true,
                mount: true,
                React: true,
                fetchMock: true,
                i18n: true
            }
        }
    ]
};
