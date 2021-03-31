# SurveyjsAngularCli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Set up your environment to run this project

Important: this project needs **nodejs** installed on your system.

1.  Clone this project to your machine using `git clone _URL_`.
2.  After the project is downloaded to your system, go to "cmd.exe" on Windows, and change the directory to the folder you just created, in this case the folder will be called "survey-sample-angular"
3.  Execute the following instruction: `npm install`. This instruction uses npm to install all the dependencies you need to run this web app. They're all contained in "package.json"
4.  After this, open another command window and navigate to the cloned folder, and run the command `npx prisma studio`. This step opens a GUI on your web-browser, through which you can monitor your database. It should be empty when you start.
5.  Then, open another command window, navigate to the cloned folder, and run `node src/index.js`. This will run a GraphQL Playground where you can write and execute queries and mutations to query/manipulate the database.
6.  After you're done with these steps, run `ng serve`. This will run an Angular web app on your browser. When you fill out the survey, a corresponding entry will be made in your database.

## Seeing the results:

After filling out the survey, you can refresh the Prisma Studio tab on your browser, and see a new entry with the data you filled out.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
