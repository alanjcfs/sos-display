var gulp = require('gulp');
var gutil = require("gulp-util");
var eslint = require('gulp-eslint');
var webpack = require('webpack');
var webpack_dev = require('webpack-dev-server');
var config = require('./webpack.config.js');

gulp.task('eslint', function() {
  return gulp.src(['./app/**/*.js','!node_modules/**','!server/**'])
    .pipe(eslint('.eslintrc'))
    .pipe(eslint.format());
});

gulp.task('webpack', function(callback) {
  var compiler = new webpack(config);
  var options = {
    publicPath: config.output.publicPath,
    stats: { colors: true },
    hot: true
  };
  new webpack_dev(compiler, options).listen(8080, "localhost", function (err) {
    if(err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    }
    gutil.log("[webpack-dev-server]", "http://localhost:8080/build/");
    callback();
  });
});

gulp.task('default', ['eslint', 'webpack'], function() {
  gulp.watch(['./app/**/*.js'], ['eslint']);
});
