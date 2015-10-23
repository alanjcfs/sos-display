var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

gulp.task('jshint', function() {
  gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('es6', function () {
  return gulp.src('app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({ optional: ['runtime'] }))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('default', ['jshint', 'es6', 'webserver'], function() {
  gulp.watch('./app/**/*.js', function() {
    gulp.run('jshint');
    gulp.run('es6');
  });
});
