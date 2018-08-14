const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");


module.exports = (env = {}) => {
  const isDevServer = env.devServer;

  return {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      contentBase: "./build",
      port: 3023
    },
    entry: {
      app: "./src/wc-sddf-app/wc-sddf-app.js"
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "./build"),
      publicPath: "/"
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },
    resolve: {
      modules: [path.resolve(__dirname, "node_modules")]
    },
    plugins: [
      new CleanWebpackPlugin(["build"]),
      new HtmlWebpackPlugin({
        title: "WC-SDDF",
        template: path.resolve(__dirname, "src/index.html"),
        filename: path.resolve(__dirname, "build/index.html"),
        inject: false
      })
      ,
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname,
          "node_modules/@webcomponents/webcomponentsjs/*.js"
        ),
        to: "node_modules/@webcomponents/webcomponentsjs/[name].[ext]"
      }])
    ]
  };
};
