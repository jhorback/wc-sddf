const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");


module.exports = (env = {}) => {
  const isDevServer = env.devServer;

  return {
    mode: "development",
    //devtool: "inline-source-map",
    devServer: {
      contentBase: "./build",
      port: 3023
    },
    
    entry: {
      app: ["babel-polyfill", "./src/wc-sddf-app/wc-sddf-app.js"],
      example1: ["babel-polyfill", "./src/example-1-elements/example-1.js"]
    },
    
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "./build"),
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
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            "presets": [
              [
                "env", {
                  "targets": {
                    "browsers": [
                      "last 2 Chrome versions",
                      //"ie 11"
                    ]
                  },
                  "modules": false
                }
              ]
            ],
            plugins: [
              "transform-class-properties",
              "transform-runtime"
            //  "syntax-dynamic-import"
            ]
          }
        }
      }]
    },

    plugins: [
      new CleanWebpackPlugin(["build"]),
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
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname,
          "node_modules/@webcomponents/webcomponentsjs/*.js"
        ),
        to: "node_modules/@webcomponents/webcomponentsjs/[name].[ext]"
      }]),
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, "src/*.html"),
        to: "[name].[ext]"
      }])
    ]
  };
};
