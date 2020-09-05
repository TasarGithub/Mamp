const {src, dest, watch} =  require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const autoprefixer = require('gulp-autoprefixer');


// Compile sass into CSS & auto-inject into browsers
function servSass() {
  return src("./sass/**/*.sass", "./sass/**/*.scss")
      .pipe(wait(400))
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(dest("./css"))
      .pipe(browserSync.stream());
}

// Static server
function bs() {
  servSass ();
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./sass/**/*.sass").on('change', servSass);
  watch("./sass/**/*.scss").on('change', servSass);
  watch("./js/*.js").on('change', browserSync.reload);
}


// gulp.task('minify-css', () => {
//   return gulp.src('css/*.+(css|!min.css)')
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(gulp.dest('dist/'));
// });



exports.serve = bs;