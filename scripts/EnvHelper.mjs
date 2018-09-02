


export class EnvHelper {
    constructor(env) {
        this.env = env;
        this.baseScripts = getBaseScripts(this);
    }

    get description() {
        return `${this.isDevServer ? "SERVING" : "BUILDING"} for ${this.targetBrowser.toUpperCase()} (${this.mode} mode)`;
    }

    get targetBrowser() {
        return this.env.target || "chrome";
    }

    get mode() {
        return this.env.mode || 
            this.isDevServer ? "development" : "production"
    }

    /** @return {boolean} true if running the dev server */
    get isDevServer() {
        return this.env.isDevServer;
    }

    get isDevMode() {
        return this.env.mode === "development";
    }

    get isProdMode() {
        return this.env.mode === "production";
    }

    get isIe() {
        return this.targetBrowser === "ie";
    }

    get isModern() {
        return this.targetBrowser === "modern";
    }

    get isChrome() {
        return this.targetBrowser === "chrome";
    }

    get targetBuildDir() {
        return `./build/${this.targetBrowser}/`
    }

    get babelExclude() {
        return this.isIe ? void 0 : /node_modules/;
    }

    get devtool() {
        return (this.isIe || this.isProdMode) ? "source-map" : "eval-source-map";
    }

    get browsers() {
        let browsers = [];
        if (this.isChrome) {
            browsers = ["last 2 Chrome versions"];
        } else if (this.isIe) {
            browsers = ["ie 11"];
        } else {
            browsers = [
                "last 2 Firefox versions",
                "last 2 Safari versions"
            ];
        }

        return browsers;
    }

    entry(entry) {
        return entry ? this.baseScripts.concat(entry) : [...this.baseScripts];
    }
}




/**
 * Will want to use this to dynamically build up the entry point.
 * Include babel-polyfill only in the browser(s) that need it.
 * Cannot do this until the webcomponents-loader.js script is fixed
 * to allow window.WebComponents.root.
 * 
 * usage syntax:
 * entry: {
 *  app: envh.entry(["script"]);
 * }
 */
function getBaseScripts(envh) {
    let baseScripts = [];

    if (envh.isIe) {
        baseScripts = [
            "babel-polyfill",
            "./src/WebComponentsRoot.js",
            "./tmp/webcomponents-loader.js"
            //"./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"
        ];
    } else if (envh.isModern) {
        baseScripts = [
            "./src/WebComponentsRoot.js",
            "./tmp/webcomponents-loader.js"
            //"./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"
        ];
    } else {
        baseScripts = [
            "./src/WebComponentsRoot.js"
        ];
    }

    return baseScripts;
} 
