import 'colors';
import postcss from 'postcss';
//import postcssSass from '@csstools/postcss-sass';
import postcssPresetEnv from 'postcss-preset-env';
import sass from 'node-sass';
import glob from 'glob';
import fs from 'fs';
import path from 'path';
import watch from 'node-watch';
import { CommandExecutor } from "./CommandExecutor.mjs";


class CSS {
    constructor({verbose = false}) {
        this.verbose = verbose;

        //const plugins = [postcssSass, postcssPresetEnv];
        const env = postcssPresetEnv({
            stage: 3,
            browsers: "ie 11"
        });

        const plugins = [env];
        this.postCssProcessor = postcss(plugins);
    }

    async build() {
        try {
            const timeLabel = "css: build finished in".green;
            const paths = await this.getSassFilePaths();
            console.log("css: Building...");
            this.verbose && console.time(timeLabel);
            await this.processSassFiles(paths);
            console.log("css: Done building!");
            this.verbose && console.timeEnd(timeLabel);
        } catch (error) {
            console.error("ERROR", error);
        }
    }

    watch() {
        try {
            console.log("STARTING sasquatch...".green);
            watch("./src/", {
                filter: /\.scss$/,
                recursive: true
            }, (event, filename) => {
                // process all scss files if a partial (begins with an underscore).
                // otherwise just regenerate the single scss file.
                const name = path.basename(filename);
                if (name.indexOf("_") === 0) {
                    this.build();
                } else {
                    (event !== "remove") && this.processSassFile(filename);
                }
            });
        } catch(error) {
            console.error("ERROR", error);
        }
    }

    async clean() {
        console.log("css: clean");
        const files = await this.getGeneratedFilePaths();
        files.forEach(f => {
            fs.unlinkSync(f);
        });
        console.log("css: finished clean");
    }

    getSassFilePaths() {
        return new Promise((resolve, reject) => {
            glob("src/**/*.scss", {
                ignore: "src/**/_*.scss",
            }, (err, files) => {
                err ? reject(err) : resolve(files);
            });
        });
    }

    getGeneratedFilePaths() {
        return new Promise((resolve, reject) => {
            glob("src/**/*-css.js", (err, files) => {
                err ? reject(err) : resolve(files);
            });
        });
    }

    async processSassFiles(paths) {
        const processes = paths.map(p => this.processSassFile(p));
        await Promise.all(processes);
    }

    async processSassFile(filePath) {
        const {verbose} = this;
        const timeLabel = `Finished processing ${filePath} in`.green;
        
        if (verbose) {
            console.log("css: processing file", filePath);
            console.time(timeLabel);
        }
        
        return new Promise(async (resolve, reject) => {
            try {
                const css = await this.renderSassFromFile(filePath);
                const result = await this.postCssProcessor.process(css, {
                    from: null
                });
                const cssJs = this.getJsTemplate(result.css);
                const dir = path.dirname(filePath);
                const name = path.basename(filePath, ".scss");
                const cssJsName = `${dir}/${name}-css.js`;
                fs.writeFile(cssJsName, cssJs, function (err) {
                    err ? reject(err) : resolve(cssJsName);
                    if (verbose) {
                        console.timeEnd(timeLabel);
                    } else {
                        console.log(`css: processed ${filePath}`.green);
                    }
                });
            } catch (err) {
                console.error("css: ERROR", err);
                reject(err);
            }
        });        
    }

    renderSassFromFile(file) {
        return new Promise((resolve, reject) => {
            sass.render({
                file
            }, (err, result) => {
                err ? reject(err) : resolve(result.css.toString('utf8'));
            });
        });
    }

    readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                err ? reject(err) : resolve(data.toString('utf8'));
            });
        }); 
    }

    getJsTemplate(style) {
        return `
/**
 * Generated css.
 */
import {html} from '@polymer/polymer/polymer-element.js';

export const style = html\`
<style>
${style}
</style>\`;
        `;
    }
}





const program = new CommandExecutor({
    build: false,
    clean: false,
    verbose: false,
    watch: false
});

program.addCommand("build", {
    help: "Transform the scss files into [name]-css.js",
    updateEnv: (env) => {
        env.build = true;
        env.clean = true;
    },
    execute
});

program.addCommand("watch", {
    help: "Set a watch on .scss files to run build when updated",
    updateEnv: (env) => {
        env.watch = true;
    },
    execute
});

program.addCommand("clean", {
    help: "Remove all *-css.js files",
    updateEnv: (env) => {
        env.clean = true
    },
    execute
});

program.addOption("clean", {
    flag: "c",
    help: "Remove all *-css.js files",
    defaultValue: false,
    updateEnv: (env) => {
        env.watch = true;
    }
});

program.addOption("verbose", {
    flag: "v",
    help: "Turn on vebose debugging output",
    defaultValue: false,
    updateEnv: (env) => {
        env.verbose = true;
    }
});

program.addOption("watch", {
    flag: "w",
    help: "Set a watch on .scss files to run build when updated",
    defaultValue: false,
    updateEnv: (env) => {
        env.watch = true;
    }
});


program.execute((commandName, env) => {

    if (commandName === "help") {
        console.log("\nAi css".bold);
        return;
    } 

    console.log(`css ${commandName}`.green);
    if (env.verbose) {
        console.log("ENV:");
        Object.keys(env).forEach((key) => {
        console.log(`  ${key}: ${env[key]}`);
        });
        console.log("");
    }
});


async function execute(env) {
    const css = new CSS({verbose: env.verbose});
    env.clean && await css.clean();
    env.build && await css.build();
    env.watch && css.watch();
}