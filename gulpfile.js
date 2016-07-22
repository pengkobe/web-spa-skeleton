var gulp = require('gulp');

browserSync = require('browser-sync');

// Start the server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
});

// 将bower的库文件对应到指定位置
gulp.task('refBowerComponents',function() {
    gulp.src('./bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist/lib/js'));
    gulp.src('./bower_components/jquery/dist/jquery.min.map')
        .pipe(gulp.dest('./dist/lib/js'));
});
// Compile SASS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src('./dist/sass/*.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('./dist/css/style.css'))
        .pipe(browserSync.reload({stream:true}));
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});
 var files = [
    './dist/*.html',
    './dist/img/**/*.*',
    './dist/tpl/**/*.html',
    './dist/js/**/*.js',
    './dist/css/**/*.css'
  ];
// Watch scss AND html files, doing different things with each.
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch(files, ['bs-reload']);
});
