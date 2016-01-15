'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');

var browserify = require('browserify');
var watchify = require('watchify');
var bebelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');
var glob = require('glob');
var b = browserify({
  entries: ['./js/index.js'],
  transform: ['babelify'],
})

function clean(){
  glob('./dist/*', {}, function(err, files){
    files.forEach(function(file){
      fs.unlink(file)
    })
  })
}

function productionBuild(){
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error')  )
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
}

function build(){
  b = watchify(
    b.on('update', bundle).on('log', gutil.log)
  );
  bundle()

  function bundle(){
    return b.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error')  )
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'));
  }
}

gulp.task('clean', clean)
gulp.task('production', ['clean'], productionBuild);
gulp.task('dev', ['clean'], build);
gulp.task('default', ['dev']);
