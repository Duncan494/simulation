var gulp = require('gulp'),
     pug = require('gulp-pug'),
     rename = require('gulp-rename');

gulp.task('default', function () {
    return gulp.src('./www/*.pug')
        .pipe(pug())
        .pipe(rename({
            extname: '.php'
        }))
        .pipe(gulp.dest('.'));
});
