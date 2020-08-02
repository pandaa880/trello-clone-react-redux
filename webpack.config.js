const path = require("path");

const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// files regexes
const jsRegex = /\.js$/;
const htmlRegex = /\.html$/;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const imageRegex = /\.(png|jpe?g|gif)$/i;

// config
module.exports = () => {
  return {
    // bundling mode
    mode: "development",
    // entry point
    entry: "./src/index.js",
    // sourcemaps
    devtool: "inline-source-map",
    // output
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
    },
    // loaders setup
    module: {
      rules: [
        {
          test: jsRegex,
          exclude: /node_modules/,
          use: [{ loader: "babel-loader" }],
        },
        {
          test: htmlRegex,
          use: [{ loader: "html-loader" }],
        },
        // loader for css modules
        {
          test: cssRegex,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
          ],
          include: cssModuleRegex,
        },
        // loader for normal css
        {
          test: cssRegex,
          use: ["style-loader", "css-loader"],
          exclude: cssModuleRegex,
        },
        // loader for importing images
        {
          test: imageRegex,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    // plugins
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "Trello Clone",
        template: path.resolve(__dirname, "public/index.html"),
        filename: "./index.html",
      }),
      new Webpack.HotModuleReplacementPlugin(),
    ],
    // development server config
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 5012,
      quiet: true,
      hot: true,
    },
  };
};
