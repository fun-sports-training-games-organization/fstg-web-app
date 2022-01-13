# Project 2 - Fun Sports Training Games

### Description

Fun Sports Training Games is an app intended to document workout plans and record the results for those workouts to track progress over time. That, along with multi language support (de/en/fr/it) is essentially the scope of Fun Sports Training Games in terms of Project 2. However, those features alone don't really accomplish the goal of making Fun Sports Training Games a unique App. That is why the vision for Fun Sports Training Games would be to eventually add features to the App to turn the workouts into fun games & competitions as well as automating the process of entering results for the workouts.

See more information about Fun Sports Training Games below including the Project 2 Scope (5 Modules), planned tech stack (Frontend, Backend, Authentication), and future planned features that currently fall outside of the scope of Project 2, but could be added later if time permits (Nice to Haves).

### 5 Modules

- User Management
- Security
- Create Workout (includes Create Exercise )
- Workout
- Workout Statistics

### Frontend

- Material-UI (CSS Framework)
- React + Redux (Typescript)

### Backend

- Google Firebase: https://console.firebase.google.com/u/1/project/fstg-edb94/settings/general/web:NDBhNGM1NDktMTUyZS00MGEyLTg1NDQtNjc4NTUxMWJlNjU0

### Authentication

- Sign In with Google, Facebook or Twitter

### Nice to Haves

- Extend Multi Language Support (FR, IT, etc...)
- Upload workout evidence (for verification purposes)
- Challenging friends or other users
- Leadership board
- Profile (private or public mode)
- Cool data visualization for the user
- Customizable dashboard
- Live challenges with movement tracking and live results
- Voice command

### Backlog

https://github.com/fun-sports-training-games-organization/fstg-web-app/projects/2

### Wireframing

https://miro.com/welcomeonboard/Z2N0eXNGbXQ3M3FPbkZXblFQRWY0ZW9qUUxqQ200MllOT3B3VGFTbXNlODgwMlN0cXQ1MXltOFhYaDd0ZkZMOXwzMDc0NDU3MzQ2NjExODM4Njc1?invite_link_id=6699961836

### Deployed App

- https://fun-sports-training-games.com
- https://fstg-edb94.firebaseapp.com

### Initial Setup

copy env.template and rename to env.local, go here: https://console.firebase.google.com/u/1/project/fstg-edb94/settings/general/web:NDBhNGM1NDktMTUyZS00MGEyLTg1NDQtNjc4NTUxMWJlNjU0 (you will obviously need valid credentials) and go to the section "SDK setup and configuration", select the config radio button there and fill in the variables in env.local with the variables in the const firebaseConfig.

## Storybook

We have written some stories to go with our components to use as code reference and documentation.

***Important***: Please use `npm ci` to install the exact versions defined in `package-lock.json`, because things may break in Storybook version 6.4.X.

To start storybook locally, you can run the following command:

```shell
npm run storybook
```
Optionally, you can build storybook and deploy it to your desired host location with the following command:
```shell
npm run storybook:export
```

## Component Tests, E2E-Testing, Coverage and ESLint Reports
#### To run a normal test, you can run the following command:
```shell
npm test
```
HTML Test Report Location: `doc/html-report/index.html` 

#### To run a test WITH coverage report, you can run the following command:
```shell
npm run test:coverage
```
Coverage Report Location:  `.doc/coverage/lcov-report/index.html`

#### To run an E2E Test, you can run the following command:
```shell
npm run e2e
```

Cypress Video Output Location: `.doc/cypress-report/videos`

#### To run a lint check, you can run one of the following commands:
```shell
# checks lint in command line only
npm run lint
# checks lint and produce an HTML report
npm run lint:html
# checks lint and auto-fixes whatever is auto-fixable
npm run lint:fix
```

ESLint Report Location: `.doc/html-report/lint_report.html`

## Firebase Deployment
Our project is set up with GitHub Actions that will automatically deploy our App to Firebase after a successful merge to our main branch.
However, it is still possible to do a manual deployment using firebase. Please setup firebase using the correct API credentials and run the following commands to invoke a manual deployment.
```shell
# if you have not yet installed the dependencies
npm ci
# to build the React App bundle
npm run build
# to deploy to firebase (firebase must first be configured with the right API settings)
firebase deploy
```
