# SkiTab

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.
Node version: 18.16.0

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

To deploy the application on firebase:
- To build the project on Angular: ng build --configuration production
- To deploy the project into Firebase: firebase deploy

To start the server on Angular as production
- ng serve --configuration production

Configuring environments on Firebase
- To se available projects: firebase projects:list
- To add and use a certain project: firebase use --add skitab-prod
- To use an already added project: firebase use skitab-prod