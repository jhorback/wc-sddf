const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");


// the plubins need to be created within a cjs script
// this allows the webpack.config to be an esm
module.exports = {
    
    copyWebpackPlugin: function(...args) {
        return new CopyWebpackPlugin(...args);
    },

    htmlWebpackPlugin: function(...args) {
        return new HtmlWebpackPlugin(...args);
    },

    cleanWebpackPlugin: function(...args) {
        return new CleanWebpackPlugin(...args);
    }
};
