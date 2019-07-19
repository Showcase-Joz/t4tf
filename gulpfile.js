const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const del = require('del');
const newer = require('gulp-newer');
const htmlmin = require('gulp-htmlmin');
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

// Collapse all html whitespace 
function html() {
  return gulp
    .src([
      './src/*.html',
    ])
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist'));
}

// copy font awesome to local 
function copyFA() {
  return gulp
    .src([
      './node_modules/@fortawesome/fontawesome-pro/scss/**/*',
    ])
    // .pipe(rename({prefix: '_',}))
    // .pipe(header('$fa-font-path:        ".dist/css/fonts/";'))
    .pipe(gulp.dest('./src/scss/'))
}

// Copy FA webfonts 
function copyFAWeb() {
  return gulp
    .src([
      './node_modules/@fortawesome/fontawesome-pro/webfonts/**/*'
    ])
    .pipe(gulp.dest('./dist/webfonts/'))
}

// Optimize Images
// -- watches image folder src/img
// -- treats each image type with presets
function images() {
  return gulp
    .src('./src/images/**/*')
    .pipe(newer('./dist/images'))
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
      title: 'Image sizes after task...',
      pretty: true,
      showTotal: true,
    }))
    .pipe(gulp.dest('./dist/images'));
}

// CSS task
// -- watches all scss files under src/scss/
// -- prefixes, concatenates/compresses, minifies and sourcemaps
function css() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      // includePaths: require('node-normalize-scss').with('other/path', 'another/path')
      // - or -
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      browsers: 'last 2 versions',
    }))
    .pipe(sass({
        outputStyle: 'compressed',
      })
      .on('error', sass.logError))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(sourcemaps.write(''))
    .pipe(size({
      title: 'CSS size after task...',
      pretty: true,
      showTotal: true,
    }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browsersync.stream());
}

// JS task
// -- watches all js files under src/js/
// -- transpiles, concatenates, minifies and sourcemaps
function scripts() {
  return (
    gulp
    .src([
      './node_modules/smooth-scroll/dist/smooth-scroll.js',
      './src/js/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write(''))
    .pipe(size({
      title: 'Scripts size after task...',
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
  gulp.watch('./src/img/**/*', images);
}

// Tasks
gulp.task('copy', copy);
gulp.task('images', images);
gulp.task('css', css);
gulp.task('scripts', scripts);
gulp.task('copyFA', copyFA);
gulp.task('copyFAWeb', copyFAWeb);
gulp.task('clean', clean);

// init
gulp.task(
  'init',
  gulp.series(clean, gulp.parallel(copy, images, css, copyFA, copyFAWeb, scripts), gulp.parallel(watchFiles, browserSync))
);

// build
gulp.task(
  'build',
  gulp.series(clean, gulp.parallel(copy, images, html, css, copyFA, copyFAWeb, scripts))
);


// watch
gulp.task('watch', gulp.parallel(watchFiles, browserSync));