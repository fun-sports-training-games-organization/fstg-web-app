module.exports = {
    testEnvironment: 'jsdom',
    collectCoverage: false,
    collectCoverageFrom: [
        '**/*.{ts,tsx}',
        '!build/**',
        '!**/coverage/**',
        '!**/index.ts',
        '!**/**.stories.tsx',
        '!**/styles/*.ts',
        '!**/storybook/*.ts',
        '!**/__tests__/util/**',
        '!**/__tests__/puppeteer-storyshots.runner.ts',
        '!**/src/components/DataTable/**' // until we figure out how to click and drag to resize and reorder column headings
    ],
    coverageDirectory: '<rootDir>/.doc/coverage',
    roots: ['src'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    testPathIgnorePatterns: ['node_modules/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.js?$': 'babel-jest',
        '^.+\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx'
    },
    testMatch: ['**/*.test.(ts|tsx|js)'],
    moduleNameMapper: {
        // Mocks out all these file formats when tests are run.
        '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    reporters: [
        'default',
        [
            'jest-stare',
            {
                resultDir: '.doc/html-report',
                reportTitle: 'FSTG Test Suite!',
                reportHeadline: 'FSTG Test Suite',
                coverageLink: '../../.doc/coverage/lcov-report/index.html',
                hidePassing: true
            }
        ]
    ],
    globals: {
        babelConfig: '.babelrc',
        isolatedModules: true,
        'ts-jest': {}
    },
    testTimeout: 15000
};
