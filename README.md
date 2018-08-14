# WC-SDDF

Example code for web components and single directional data flow.

### Setup

##### Prerequisites

Run yarn to install the node modules

    yarn

### Start the development server

This command serves the app at `http://localhost:3023` and sets up watch tasks for development.

    yarn start

### Build

The `yarn build` command builds the application in the `build` directory.

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
