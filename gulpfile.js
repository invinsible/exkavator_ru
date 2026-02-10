const { src, dest, watch, series, parallel } = require('gulp');
const sass         = require('gulp-sass')(require('sass'));
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const terser       = require('gulp-terser');
const concat       = require('gulp-concat');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const browserSync  = require('browser-sync').create();
const del          = require('del');

// Пути
const paths = {
  html: {
    src:  'src/html/**/*.html',
    dest: 'dist/'
  },
  styles: {
    src:  'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src:  'src/js/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src:  'src/img/**/*.{png,jpg,jpeg}',
    dest: 'dist/img/'
  },
  fonts: {
    src:  'src/fonts/**/*.{woff,woff2}',
    dest: 'dist/fonts/'
  }
};

// Обработка ошибок
function handleError(err) {
  console.error(err.message);
  this.emit('end');
}

// Очистка dist/
function clean() {
  return del(['dist']);
}

// HTML 
function html() {
  return src(paths.html.src)
    .pipe(newer(paths.html.dest))
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// CSS - автопрефиксы, минификация
function styles() {
  return src(paths.styles.src)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', handleError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// JS - конкатенация, минификация
function scripts() {
  return src(paths.scripts.src)
    .pipe(concat('main.min.js'))
    .pipe(terser())
    .on('error', handleError)
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Сжатие картинок
function images() {
  return src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 })
    ]))
    .pipe(dest(paths.images.dest));
}

// Копирование шрифтов
function fonts() {
  return src(paths.fonts.src)
    .pipe(newer(paths.fonts.dest))
    .pipe(dest(paths.fonts.dest))
    .pipe(browserSync.stream());
}

// Dev-сервер
function serve(done) {
  browserSync.init({
    server: { baseDir: 'dist/' },
    port: 3000,
    notify: false,
    open: true
  });
  done();
}

// Слежение за файлами
function watchFiles(done) {
  watch(paths.html.src, html);
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
  watch(paths.fonts.src, fonts);
  done();
}

// Сборка
const buildAll = parallel(html, styles, scripts, images, fonts);

// dev
exports.default = series(clean, buildAll, parallel(serve, watchFiles));

// build
exports.build = series(clean, buildAll);

exports.clean = clean;
