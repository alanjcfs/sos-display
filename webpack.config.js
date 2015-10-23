var path = require('path');

var build = path.resolve(__dirname, 'build');
var deps = path.resolve(__dirname, 'build/vendor/js');

module.exports = {
  entry: './app/app.js',
  output: {
    path: build,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    root: [build, deps],
    extensions: ['', '.js', '.jsx']
  }
};
