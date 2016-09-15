
// Ddependencies 
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    open = require('gulp-open');

/**
 * Process the sass into demo folder.
 * More information about sass http://sass-lang.com/
 */
gulp.task('sass', function () {
  return gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./demo/css/'));
});

/**
 * Your development server with livereload.
 * More information about connect https://www.npmjs.com/package/gulp-connect
 * Livereload chrome plugin https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
 */
gulp.task('connect', function() {
  connect.server({
    root: 'demo',
    livereload: true
  });
});

/**
 * Trigger the browser reload if you are using livereload. 
 */
gulp.task('html', function () {
  gulp.src('./src/demo.html')
    .pipe(gulp.dest('./demo/'));
  gulp.src('./demo/demo.html')
    .pipe(connect.reload());
});

/**
 * Open browser window with the default application.
 */
gulp.task('open', function(){
  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:8080/demo.html'}));
});

/**
 * Watch for file changes and update the browser window on change.
 * More information about watch https://www.npmjs.com/package/gulp-watch
 */
gulp.task('watch', function () {
  gulp.watch(['./src/demo.html', './demo/**/*.css'], ['html']);
  gulp.watch(['./*.scss'], ['sass']);
});

gulp.task('demo', ['sass','connect', 'watch', 'open']);
