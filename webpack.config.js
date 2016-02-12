var path = require('path');
var webpack = require('webpack');

var build = path.resolve(__dirname, 'build');
var deps = path.resolve(__dirname, 'build/vendor/js');

module.exports = {
  entry: {
    app: ['./app/app.js']
  },
  node: { fs: "empty" }, // PIXI does require('fs')
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
        loader: 'babel',
        query:
            {
              presets:['react']
            }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl'
      }
    ]
  },
  resolve: {
    root: [build, deps],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      'angular': 'angular'
    })
  ]
};
