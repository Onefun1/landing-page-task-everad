const gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache');
clean = require('gulp-clean');

gulp.task('sass', function() {
  return (
    gulp
      .src('./src/scss/**/*.scss')
      .pipe(sass())
      .pipe(
        autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
          cascade: true
        })
      )
      // .pipe(cssnano())
      // .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./src/css'))
      .pipe(browserSync.reload({ stream: true }))
  );
});

// gulp.task(
//   'css-libs',
//   gulp.series('sass', function() {
//     return gulp
//       .src('./src/css/libs.css')
//       .pipe(cssnano())
//       .pipe(rename({ suffix: '.min' }))
//       .pipe(gulp.dest('src/css'));
//   })
// );

gulp.task('clean-scripts', function() {
  return gulp.src('app/tmp/*.js', { read: false }).pipe(clean());
});

gulp.task('scripts', () =>
  gulp
    .src('src/js/app.js')
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/js/main/'))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('clean', async function() {
  return del.sync('dist');
});

gulp.task('img', function() {
  return gulp
    .src('src/img/**/*')
    .pipe(
      cache(
        imagemin({
          interlaced: true,
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          use: [pngquant()]
        })
      )
    )
    .pipe(gulp.dest('dist/img'));
});

gulp.task('prebuild', async function() {
  gulp
    .src('src/css/main.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));

  gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));

  gulp.src('src/js/main/main.js').pipe(gulp.dest('dist/js'));

  gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

gulp.task('clear', function(callback) {
  return cache.clearAll();
});

gulp.task('server', function() {
  browserSync.init({
    server: 'src',
    notify: false
  });
  browserSync.watch('src/**/*.*').on('change', browserSync.reload);
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.*', gulp.series('sass'));
  gulp.watch('src/js/app.js', gulp.series('clean-scripts', 'scripts'));
  gulp.watch('src/*.html', browserSync.reload);
});

gulp.task('dev', gulp.parallel('server', 'watch'));
gulp.task(
  'build',
  gulp.series('clean', gulp.parallel('img', 'sass', 'scripts'), 'prebuild')
);
