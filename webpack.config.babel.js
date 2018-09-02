import path from "path";
import { EnvHelper } from "./scripts/EnvHelper.mjs";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";

/*
Environment flags:
  --env.isDevServer
  --env.target = ie, modern, chrome
  --env.mode = development, production
*/
export default (env = {}) => {

  const envh = new EnvHelper(env);
  console.log(envh.description);

  const config = {
    mode: envh.mode,
    devtool: envh.devtool,
    devServer: {
      contentBase: envh.targetBuildDir,
      port: 3023
    },
    
    entry: {
      app: envh.entry(["./src/wc-sddf-app/wc-sddf-app.js"]),
      example1: envh.entry(["./src/example-1-elements/example-1.js"]),
      example2: envh.entry(["./src/example-2-elements/example-2.js"]),
      example3: envh.entry(["./src/example-3-elements/example-3.js"])
    },
    
    output: {
      filename: "[name].bundle.js?[hash]",
      path: path.resolve(__dirname, envh.targetBuildDir),
      publicPath: "/"
    },
    
    // caused an inssue with paper-card impor?
    // optimization: {
    //   splitChunks: {
    //     chunks: "all"
    //   }
    // },
    
    resolve: {
      modules: [path.resolve(__dirname, "node_modules")]
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
                    "browsers": envh.browsers
                  },
                  "modules": false
                }
              ]
            ],
            plugins: [
              // "transform-class-properties",
              // "transform-runtime"
              // "syntax-dynamic-import"
            ]
          }
        }
      }]
    },

    plugins: [
      new CleanWebpackPlugin([envh.targetBuildDir]),
      // new HtmlWebpackPlugin({
      //   template: path.resolve(__dirname, "src/index.html"),
      //   filename: path.resolve(__dirname, "build/index.html"),
      //   inject: false
      // }),
      // new HtmlWebpackPlugin({
      //   template: path.resolve(__dirname, "src/example1.html"),
      //   filename: path.resolve(__dirname, "build/example1.html"),
      //   inject: false
      // }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
        filename: path.resolve(__dirname,  `${envh.targetBuildDir}index.html`),
        chunks: ["app"]
      }),
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname,
          "node_modules/@webcomponents/webcomponentsjs/**/*"
        ),
        //to: "node_modules/@webcomponents/webcomponentsjs/"
      }])
    ]
  };

  return config;
};
