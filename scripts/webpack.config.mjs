import path from "path";
import { EnvHelper } from "./EnvHelper.mjs";
import plugins from "./webpack.plugins.js";

/**
 * See the EnvHelper for the variables
 * used to control webpack.
 */
export default (env = {}) => {

  const envh = new EnvHelper(env);
  const config = {
    mode: envh.mode,
    devtool: envh.devtool,
    
    devServer: {
      contentBase: envh.targetBuildDir,
      port: 3023
    },
    
    entry: {
      "webcomponents": envh.webComponentsEntry
    },

    output: {
      // cannot use chunkhash in the dev server
      filename: `[name].bundle.js?[${envh.isDevServer ? "hash" : "chunkhash"}]`,
      path: resolvePath(envh.targetBuildDir),
      publicPath: "/"
    },

    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },

    performance: {
      hints: false
    },
    
    resolve: {
      modules: [resolvePath("node_modules")]
    },
    
    module: {
      rules:[{
        test: /\.js$/,
        exclude: envh.babelExclude,
        use: {
          loader: "babel-loader",
          options: {
            "presets": [
              [
                "@babel/env", {
                  "targets": {
                    "browsers": envh.browserList
                  },
                  "modules": false
                }
              ]
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }
      }]
    },

    plugins: [
      plugins.cleanWebpackPlugin(
        [envh.targetBuildDir], {
        root: resolvePath("."),
        verbose: envh.verbose
      }),
      plugins.htmlWebpackPlugin({
        template: resolvePath("./src/index.html"),
        filename: resolvePath(`${envh.targetBuildDir}index.html`),
        inject: "head"
      }),
      plugins.htmlWebpackPlugin({
        template: resolvePath("./src/example-1.html"),
        filename: resolvePath(`${envh.targetBuildDir}example-1.html`),
        inject: "head"
      }),
      plugins.htmlWebpackPlugin({
        template: resolvePath("./src/example-2.html"),
        filename: resolvePath(`${envh.targetBuildDir}example-2.html`),
        inject: "head"
      }),
      plugins.htmlWebpackPlugin({
        template: resolvePath("./src/example-3.html"),
        filename: resolvePath(`${envh.targetBuildDir}example-3.html`),
        inject: "head"
      }),
      plugins.copyWebpackPlugin([{
        from: resolvePath(
          "node_modules/@webcomponents/webcomponentsjs/bundles/**/*.js"
        )
      }, {
        from: resolvePath(
          "node_modules/@webcomponents/webcomponentsjs/*.js"
        )
      }])
    ]
  };

  return config;
};

/*
update the html files and content
*/

function resolvePath(pathToResolve) {
  const dirName = process.cwd();
  return path.resolve(dirName,  pathToResolve);
}
