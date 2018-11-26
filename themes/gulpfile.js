// var Promise = require('es6-promise').Promise;
var promise = require('es6-promise').polyfill();
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    },
    notify: false
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

var theme_path = './default';

var sass_paths = [
    './assets/general.scss',
    theme_path + '/scss/styles.scss'
];

gulp.task('styles', function(){
  gulp.src(sass_paths)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sourcemaps.init())
    .pipe(sass())
	.pipe(autoprefixer({
	    browsers: ['last 5 versions'],
	    cascade: false
	}))
    .pipe(cssnano({
        zindex: false
     }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(theme_path + '/css/'))
});

gulp.task('default', function(){
  gulp.watch(theme_path + "/**/*.scss", ['styles']);
  gulp.watch("./assets/**/*.scss", ['styles']);
});