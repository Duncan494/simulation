var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    pug = require('gulp-pug'),
    pugPHPFilter = require('pug-php-filter');
    
gulp.task('pug', function() {
    return gulp.src('../www-src/**/*.pug')
    .pipe( pug({
        basedir: "../www-src/",
        pretty: "\t",
        filters: {
        php: pugPHPFilter
    }
}) )
    .pipe(rename(function (path) {
        path.extname = ".php"
    }))
    .pipe(gulp.dest('../site'));

});
gulp.task('stream', function () {
    // Endless stream mode
    return watch('css/**/*.css', { ignoreInitial: false })
        .pipe(gulp.dest('build'));
});
 
gulp.task('callback', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch('css/**/*.css', function () {
        gulp.src('css/**/*.css')
            .pipe(gulp.dest('build'));
    });
});