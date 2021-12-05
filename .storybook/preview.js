// /**
//  * Read https://storybook.js.org/docs/react/configure/overview#configure-story-rendering
//  * for more information about the purpose of this file.
//  *
//  * Use preview.js for global code (such as CSS imports or JavaScript mocks)
//  * that applies to all stories. For example, `import thirdPartyCss.css`.
//  *
//  * This file can have three exports:
//  * - decorators - an array of global decorators
//  * - parameters - an object of global parameters
//  * - globalTypes - definition of globalTypes
//  */
//
// /**
//  * Decorators
//  *
//  * A decorator is a way to wrap a story in extra “rendering” functionality.
//  *
//  * Example:
//  *
//  * import React from 'react';
//  * export const decorators = [(Story) => <div style={{ margin: '3em' }}><Story/></div>];
//  *
//  * Each story throughout the library will be wrapped in a div with a margin of 3
//  */
//
// /**
//  * Parameters
//  *
//  * Most Storybook addons are configured via a parameter-based API.
//  * You can set global parameters in this file
//  *
//  * export const parameters = {
//  *   backgrounds: {
//  *     values: [
//  *       { name: 'red', value: '#f00' },
//  *       { name: 'green', value: '#0f0' },
//  *     ],
//  *   },
//  * };
//  *
//  * With backgrounds, you configure the list of backgrounds that every story can render in.
//  */
//
// /**
//  * Global Types
//  *
//  * Global Types allow you to add your own toolbars by creating
//  * globalTypes with a toolbar annotation:
//  *
//  * For example:
//  *
//  * export const globalTypes = {
//  *   theme: {
//  *     name: 'Theme',
//  *     description: 'Global theme for components',
//  *     defaultValue: 'light',
//  *     toolbar: {
//  *       icon: 'circlehollow',
//  *       // array of plain string values or MenuItem shape
//  *       items: ['light', 'dark'],
//  *       },
//  *     },
//  *   };
//  *
//  * Will add a new dropdown in your toolbar with options light and dark.
//  **/
// // import { muiTheme } from 'storybook-addon-material-ui';
// import { addDecorator, addParameters } from '@storybook/react';
// import { withThemes } from '@react-theming/storybook-addon';
// import { createTheme, ThemeProvider } from '@mui/material';
// import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
// import theme from '../src/theme/theme';
// // import { i18n } from './i18next.js';
//
// const providerFn = ({ theme, children }) => {
//     const muiTheme = createTheme(theme);
//     return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
// };
//
// // pass ThemeProvider and array of your themes to decorator
// addDecorator(withThemes(null, [theme], { providerFn }));
//
// // https://www.npmjs.com/package/@storybook/addon-backgrounds
// export const parameters = {
//     controls: { expanded: true },
//     backgrounds: {
//         default: 'white',
//         values: [
//             { name: 'black', value: '#000' },
//             { name: 'white', value: '#fff' },
//             { name: 'secondary', value: '#b4babe' },
//             { name: 'paper-background', value: 'rgba(0,0,0,0.22)' }
//         ]
//     }
//     // i18n,
//     // locale: 'en',
//     // locales: {
//     //     // en: 'English',
//     //     // fr: 'Français',
//     //     // de: 'Deutsch'
//     //     en: { title: 'English', left: '🇺🇸' },
//     //     fr: { title: 'Français', left: '🇫🇷' },
//     //     ja: { title: 'Deutsch', left: '🇩🇪' }
//     // }
// };
//
// // VIEWPORT-ADDON SCREEN SIZES
// const newViewports = {
//     kindleFire2: {
//         name: 'Kindle Fire 2',
//         styles: {
//             width: '600px',
//             height: '963px'
//         }
//     },
//     kindleFireHD: {
//         name: 'Kindle Fire HD',
//         styles: {
//             width: '533px',
//             height: '801px'
//         }
//     }
// };
//
// addParameters({
//     viewport: {
//         viewports: {
//             ...INITIAL_VIEWPORTS,
//             ...newViewports
//         }
//     }
// });

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
    // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
    actions: { argTypesRegex: '^on.*' }
};
