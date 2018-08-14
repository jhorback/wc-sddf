# Ai-Test Application

### Setup

##### Prerequisites

Install [Polymer CLI](https://github.com/Polymer/polymer-cli) using
[npm](https://www.npmjs.com).

    npm install -g polymer-cli@latest

Then run yarn to install the node modules

    yarn

### Start the development server

This command serves the app at `http://localhost:3000` and sets up watch tasks for development.
Use the Browser Sync url for hot reload `http://localhost:30001`.

    yarn start

### Build

The `yarn build` command builds the application for production, using build configuration in 
the `polymer.json` file.

There are two build configurations. These builds will be output to a subdirectory under the `build/` directory as follows:

```
build/
  ie11/
  modern/
```

* `ie11` targets Internet Explorer.
* `modern` targets all evergreen browsers.

### Preview the build

This command serves specific builds.

    yarn serve build/ie11/
    yarn serve build/modern/

### Run tests

This command will run [Web Component Tester](https://github.com/Polymer/web-component-tester)
against the browsers currently installed on your machine:

    yarn test

If running Windows you will need to set the following environment variables:

- LAUNCHPAD_BROWSERS
- LAUNCHPAD_CHROME

Read More here [daffl/launchpad](https://github.com/daffl/launchpad#environment-variables-impacting-local-browsers-detection)


