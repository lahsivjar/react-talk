const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
    library: "react-talk",
    libraryTarget: "umd"
  },
  plugins: [
    new CleanWebpackPlugin([ "dist" ])
  ],
  module: {
    loaders: [
      {
        test: path.join(__dirname, "/src"),
        loader: "babel-loader",
        query: {
          presets: ["env", "react", "stage-2"]
        }
      },
      {
        test: path.join(__dirname, "/style"),
        loader: "style-loader!css-loader!sass-loader"
      }
    ]
  }
}

