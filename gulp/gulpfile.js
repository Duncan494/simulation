const { src, dest, parallel, series, watch } = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    pug = require('gulp-pug'),
    pugPHPFilter = require('pug-php-filter'),
    phpConnect = require('gulp-connect-php'),
    browsersync = require('browser-sync');

const basedir = 'www-src/';
const destination = 'www/';

function clear() {
    return src(destination, {
            read: false,
            allowEmpty: true
        })
        .pipe(clean());
}

// JS function 

function js() {
    const source = basedir + '**/*.js';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
//        .pipe(rename({
//            extname: '.min.js'
//        }))
        .pipe(dest(destination))
        .pipe(browsersync.stream());
}

// CSS function 

function css() {
    const source = basedir + '**/*.css';

    return src(source)
        .pipe(changed(source))
        //.pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
//        .pipe(rename({
//            extname: '.min.css'
//        }))
        .pipe(cssnano())
        .pipe(dest(destination))
        .pipe(browsersync.stream());
}

// Optimize images

function img() {
    return src([basedir + '**/*.png', basedir + '**/*.jpg'])
        .pipe(imagemin())
        .pipe(dest(destination))
        .pipe(browsersync.stream());
}

// Pug PHP

function pugphp() {
    const source = basedir + '**/*.pug';
    return src(source)
        .pipe( pug({
            basedir: basedir,
            pretty: "\t",
            filters: {
            php: pugPHPFilter
            }
        }))
    .pipe(rename(function (path) {
        path.extname = ".php"
    }))
    .pipe(dest(destination))
    .pipe(browsersync.stream());
}

function connectsync() {
    phpConnect.server({
        // a standalone PHP server that browsersync connects to via proxy
        port: 3001,
        keepalive: true,
        base: destination
    }, function (){
        browsersync({
            proxy: '127.0.0.1:3001'
        });
    });
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function watchFiles() {
    watch(basedir + '**/*.pug', pugphp);
    watch(basedir + '**/*.css', css);
    watch(basedir + '**/*.js', js);
    watch([basedir + '**/*.png', basedir + '**/*.jpg'], img);
    watch(basedir + '**/*', browserSyncReload);
}
exports.watch = parallel(watchFiles, connectsync);
exports.default = series(clear, parallel(pugphp, js, css, img));