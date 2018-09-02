import path from "path";
import { EnvHelper } from "./EnvHelper.mjs";
import plugins from "./webpack.plugins.js";

/*
Environment flags:
  --env.isDevServer
  --env.target = ie, modern, chrome
  --env.mode = development, production
*/
export default (env = {}) => {

  const envh = new EnvHelper(env);
  const config = {
    mode: envh.mode,
    devtool: envh.devtool,
    devServer: {
      contentBase: envh.targetBuildDir,
      port: 3024
    },    
    entry: {
      "webcomponents": envh.webComponentsEntry
      //"wc-test-app": ["./src/wc-test-app/wc-test-app.js"]
      //"wc-test2-app": ["./src/wc-test2-app/wc-test2-app.js"]
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
                "env", {
                  "targets": {
                    "browsers": [
                      envh.isChrome ?
                        "last 2 Chrome versions" :
                        envh.isIe ?
                        "ie 11" :
                        "last 2 Firefox versions"
                        //"last 2 Safari versions"
                    ]
                  },
                  "modules": false
                }
              ]
            ],
            plugins: [
              //"transform-class-properties",
              //"transform-runtime"
              "syntax-dynamic-import"
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
      // new HtmlWebpackPlugin({
      //   template: path.resolve(__dirname, "src/index.html"),
      //   filename: path.resolve(__dirname,  `${targetBuildDir}index.html`),
      //   inject: false,
      //   hash: true
      // }),
      plugins.htmlWebpackPlugin({
        template: resolvePath("./src/index.html"),
        filename: resolvePath(`${envh.targetBuildDir}index.html`),
        //chunks: ["webcomponents", "vendors~wc-test-app~wc-test2-app", "wc-test-app"],
        inject: "head"
      }),
      plugins.copyWebpackPlugin([{
        from: resolvePath(
          "node_modules/@webcomponents/webcomponentsjs/**/*"
        ),
        //to: "node_modules/@webcomponents/webcomponentsjs/"
      }]),
      // new CopyWebpackPlugin([{
      //   from: path.resolve(__dirname, "src/*.html"),
      //   to: "[name].[ext]"
      // }])
    ]
  };

  return config;
};


function resolvePath(pathToResolve) {
  const dirName = process.cwd();
  return path.resolve(dirName,  pathToResolve);
}
