import postcss from 'postcss';
//import postcssSass from '@csstools/postcss-sass';
import postcssPresetEnv from 'postcss-preset-env';
import sass from 'node-sass';
import glob from 'glob';
import fs from 'fs';
import path from 'path';
import watch from 'node-watch';


class CSS {
    constructor() {
        //const plugins = [postcssSass, postcssPresetEnv];
        const env = postcssPresetEnv({
            stage: 3,
            browsers: "ie 11"
        });

        const plugins = [env];
        this.postCssProcessor = postcss(plugins);
    }

    async process() {
        try {
            this.clean();
            const paths = await this.getSassFilePaths();
            await this.processSassFiles(paths);
        } catch (error) {
            console.log("ERROR", error);
        }
    }

    watch() {
        try {
            console.log("STARTING sasquatch...");
            watch("./src/", {
                filter: /\.scss$/,
                recursive: true
            }, (event, filename) => {
                // process all scss files if a partial (begins with an underscore).
                // otherwise just regenerate the single scss file.
                const name = path.basename(filename);
                if (name.indexOf("_") === 0) {
                    this.process();
                } else {
                    (event !== "remove") && this.processSassFile(filename);
                }
            });
        } catch(error) {
            console.log("ERROR", error);
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
        console.log("css: processing file", filePath);
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
                });
            } catch (err) {
                console.log("css: ERROR", err);
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



const [,,...args] = process.argv;
const css = new CSS();
if (args.includes("--watch")) {
    css.watch();
} else if (args.includes("--clean")) {
    css.clean();
} else {
    css.process();
}