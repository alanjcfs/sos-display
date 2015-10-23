var gulp = require('gulp');
var gutil = require("gulp-util");
var jshint = require('gulp-jshint');
var webpack = require('webpack');
var webpack_dev = require('webpack-dev-server');
var config = require('./webpack.config.js');

gulp.task('jshint', function() {
  gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('webpack', function(callback) {
  var compiler = new webpack(config);
  var options = {
    publicPath: config.output.publicPath,
    stats : { colors : true }
  };
  new webpack_dev(compiler, options).listen(8080, "localhost", function (err) {
    if(err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    }
    gutil.log("[webpack-dev-server]", "http://localhost:8080/build/");
    callback();
  });
});

gulp.task('default', ['jshint', 'webpack'], function() {
  gulp.watch(['./app/**/*.js'], ['jshint']);
});
