const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "./dist/index.js"
  },
  plugins: [
    new CleanWebpackPlugin([ "dist" ])
  ],
  module: {
    loaders: [
      {
        test: path.join(__dirname, "./src"),
        loader: "babel-loader",
        query: {
          presets: ["env", "react"]
        }
      },
      {
        test: path.join(__dirname, "./style"),
        loader: "style-loader!css-loader!sass-loader"
      }
    ]
  }
}

