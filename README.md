## DeAngelis Home Recipes

Welcome to DeAngelisHome, this is a recipe site dedicated to recipies and simplicity. I was tired of all the sites out there with more adds than recipes :) This project it targeted as a simple recipe box for your family.

A single administrator grants access to users requesting accounts. This was meant to be family oriented and have a family administrator control the content and site.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits, and you will also see lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Important Notes
The site is run with a PHP backend that relies on a mySQL DB to store all recipies.

### `createDatabase.sql`
Is the script required to standup a new DB.

### `seedData.sql`
Seed data for initial ingrediants and measurements. Both will grow as recipies are entered but this provides a starting point.