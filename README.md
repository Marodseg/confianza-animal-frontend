# Confianza Animal

## Install project dependencies

Run `npm install` to install the dependencies and being able to run the application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Husky Git hooks

**For the first time** run `npm run prepare` to install husky. After that, when you make a change to the source files, automatically it runs `lint` to reformat the code (if possible).
Don't confuse this with the `prettier` command, which is used to format the code before committing.

## Code formatting

In case you don't configure husky, you can run `npm run lint` to check the code format. You can 
also add the `--fix` flag to automatically fix the code format (if possible).

Run `npm run prettier:check` to check if the code is formatted correctly. Another option to check for a specific file
is `npx prettier --check "src/*.ts"`.

Run `npx prettier --write "src/*.ts"` to format the code of the file.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
