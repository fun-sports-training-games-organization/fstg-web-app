# Project 2 - Fun Sports Training Games

### Description

Fun Sports Training Games is an app intended to document workout plans and record the results for those workouts to track progress over time. 
That, along with multi language support (de/en/fr/it) is essentially the scope of Fun Sports Training Games in terms of Project 2. 
However, those features alone don't really accomplish the goal of making Fun Sports Training Games a unique App. 
That is why the vision for Fun Sports Training Games would be to eventually add features to the App to turn the workouts into fun games & 
competitions as well as automating the process of entering results for the workouts.

See more information about Fun Sports Training Games below including the Project 2 Scope (5 Modules), planned tech stack 
(Frontend, Backend, Authentication), and future planned features that currently fall outside of the scope of Project 2, 
but could be added later if time permits (Nice to Haves).

## Quick Start Guide
### Authentication
User can either log in with a registered Email account or via an external auth provider such as Google, Facebook or Twitter.

Upon registering with FSTG (via email), the user will receive a confirmation email to verify their email address. We have plans to
further implement our Firebase Rules to only allow users to do write operations in our database who have verified their email address.
This applies to externally logged-in users as well. They should have a 'verifiedEmail: true' status in their auth token before
they are able to write to our DB.

#### Known issues:
- Facebook login sometimes require two attempts

### Profile Page
Users can update their profile in their profile page. If a height and weight have been saved, then the BMI will be automatically be calculated accordingly
and can be displayed in the profile card on the dashboard. Email users also have the option to save a profile picture (max. 1MB). Externally logged-in users will have the avatar
picture from the external provider.

### Exercises
Users can create their own exercises via the Exercises page and later use them in their workouts.
An exercise must have at least a name. You also have the option of uploading a GIF (max. 1MB) which will be shown during
the workout. You can choose between Count-based or Time-based for the default amount. In addition, you can choose to record the exercises result and set a default value accordingly.

There are future plans to allow users to do and record single exercises without it being inside a workout, but this has not yet been implemented.

### Workout
Workouts can be created in the workouts page. A workout must have at least a name and can have as many exercises as you want. You can either choose
the exercises in your existing exercises list or create a new exercise directly in the create or edit workout page. Once your workout has been created or saved
you can start the workout by going to the workout page, clicking on the menu button (three vertical dots) and by clicking the play button.

### Statistics
Once at least one workout with results has been completed, you will be able to see your record(s) in your Statistics page. Currently, this only shows your best record so far
for a particular workout that has saved results. Please note that it is possible to do a workout that does NOT save any results. This is done by choice of the user.

### Additional Features
##### Language Selection
This App is available in EN/DE/FR/IT.
To change the language, go to Menu (☰) > Translate Icon > then choose your preferred language.

##### Theme Selection
This app is currently available in two themes, One Pirate and Default Theme.
To change themes, go to Menu (☰) > Moon Icon > then choose your preferred theme.

### Responsive Design
The App was designed with responsiveness in mind. When in mobile-view, the full width of the screen will be utilized to display the page. The avatar menu items automatically fall
under the side navigation in mobile-view to save space in the app bar. Dialogs will also take up the full-screen in mobile view.


## Project Specs & Development Process
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

- Upload workout evidence (for verification purposes)
- Challenging friends or other users
- Leadership board
- Profile (in private or public mode)
- Cool data visualization for the user
- Customizable dashboard (add / remove / re-order cards)
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
