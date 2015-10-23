var path = require("path");

module.exports = {
  entry: "./app/app.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "all.js",
    publicPath: "/static/"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
    ]
  }
};
