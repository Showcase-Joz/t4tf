const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const del = require('del');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const size = require('gulp-size');
const browsersync = require("browser-sync").create();


// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './dist',
      // directory: true
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del(['./dist/']);
}

// Copy all HTML files
function copy() {
  return gulp
  .src([
    './src/*.html',
    './src/*.webmanifest',
    './src/*.xml',
    './src/*.txt',
  ])
  .pipe(gulp.dest('./dist/'))
}

// Optimize Images
function images() {
  return gulp
    .src('./src/images/**/*')
    .pipe(newer('./dist/img'))
    .pipe(imagemin([
      imagemin.gifsicle({
          interlaced: true
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.optipng({
          optimizationLevel: 5
        }),
        imagemin.svgo({
          plugins: [{
              removeViewBox: true
            },
            {
              cleanupIDs: false
            }
          ]
        })
    ]))
    .pipe(size({
      title: 'Image sizes after task ',
      pretty: true,
      showTotal: true,
    }))
    .pipe(gulp.dest('./dist/img'));
}

// CSS task
// -- watches all js files under src/scss/
// -- prefixes, concatenates/compresses, minifies and sourcemaps
function css() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      cascade: false,
      browsers: 'last 2 versions', }))
    .pipe(sass({
      outputStyle: 'compressed', })
      .on('error', sass.logError))
    .pipe(rename({
      suffix: '.min', }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browsersync.stream());
}

// JS task
// -- watches all js files under src/js/
// -- transpiles, concatenates, minifies and sourcemaps
function scripts() {
  return (
    gulp
    .src(['./src/js/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write(''))
    .pipe(size({
      title: 'JS sizes after task ',
      pretty: true,
      showTotal: true,
    }))
    .pipe(gulp.dest('./dist/js'))
  );
}

// Watch files
function watchFiles() {
  gulp.watch('./src/scss/**/*', css);
  gulp.watch([
    './src/js/**/*'
  ],
  gulp.series(scripts, browserSyncReload)
  );
  gulp.watch(
    [
      './src/*.html',
      './src/*.webmanifest',
      './src/*.xml',
      './src/*.txt',
    ],
    gulp.series(copy, browserSyncReload)
  );
  gulp.watch('./src/images/**/*', images);
}

// Tasks
gulp.task('copy', copy);
gulp.task('images', images);
gulp.task('css', css);
gulp.task('scripts', scripts);
gulp.task('clean', clean);


// build
gulp.task(
  'build',
  gulp.series(clean, gulp.parallel(copy, images, css, scripts))
);


// watch
gulp.task('watch', gulp.parallel(watchFiles, browserSync));