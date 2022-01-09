const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
    stories: ['./Introduction.stories.mdx', '../src/**/*.stories.tsx'],
    // Add any Storybook addons you want here: https://storybook.js.org/addons/
    addons: [
        '@storybook/addon-controls',
        '@storybook/addon-backgrounds',
        '@storybook/addon-viewport',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-docs'
        // 'storybook-react-i18next'
    ],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../')
        });

        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
                presets: [['react-app', { flow: false, typescript: true }]]
            }
        });
        config.resolve.extensions.push('.ts', '.tsx');

        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    '@emotion/core': toPath('node_modules/@emotion/react'),
                    'emotion-theming': toPath('node_modules/@emotion/react')
                }
            }
        };
    },
    typescript: {
        check: true // type-check stories during Storybook build
    }
};
