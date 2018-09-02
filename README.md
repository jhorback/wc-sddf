# WC-SDDF

Example code for web components and single directional data flow.

### Setup

##### Prerequisites

Run yarn to install the node modules

    yarn



### Preview the application

    yarn serve

This command serves the app at `http://localhost:3023` and targets chrome.

You can pass a --ie flag to target IE11 and a --modern flag to target modern browsers that do not natively support custom elements.

```
yarn serve --ie
yarn serve --modern
```
   


### Development

    yarn start

Starts the development server and sets up a watch task for development.

    

### Build

    yarn build

Builds the application for chrome.

You can also build for other browsers:

```
yarn build --ie
yarn build --modern
```


### Watch

    yarn watch

Sets up a watch task.


### Node scripts
There are two node scripts that handle build tasks and css transpilation.
Both support a help command to see what additional options are supported.

```
yarn webdev help
yarn css help
```
