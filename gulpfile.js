'use strict';

/* Path to source code (src), path to production (build), Path to file which need watch (watch) */
var path = {
    build: {
        html: 'build/',
        js: {
            general: 'build/js/general',
            home: 'build/js/home',
            services: 'build/js/services',
            blog: 'build/js/blog',
            blog_inner: 'build/js/blog/blog-inner',
            not: 'build/js/not',
            career: 'build/js/career',
            about: 'build/js/about',
            contact: 'build/js/contact',
            hire: 'build/js/hire'
        },
        css: {
            general: 'build/css/general',
            home: 'build/css/home',
            global: 'build/css/global',
            services: 'build/css/services',
            blog: 'build/css/blog',
            blog_inner: 'build/css/blog/blog-inner',
            not: 'build/css/not',
            career: 'build/css/career',
            about: 'build/css/about',
            contact: 'build/css/contact',
            hire: 'build/css/hire'
        },
        img: 'build/img/',
        fonts: 'build/fonts/',
        icons: 'build/webfonts/'
    },
    src: {
        html: 'src/**/**/*.html',
        js: {
            main: 'src/js/*.js',
            home: 'src/js/home/**/*.js',
            services: 'src/js/services/**/*.js',
            blog: 'src/js/blog/*.js',
            blog_inner: 'src/js/blog/blog-inner/*.js',
            not: 'src/js/404/**/*.js',
            career: 'src/js/career/**/*.js',
            about: 'src/js/about/**/*.js',
            contact: 'src/js/contact/**/*.js',
            hire: 'src/js/hire/**/*.js'
        },
        style: {
            main: 'src/style/*.scss',
            home: 'src/style/home/**/*.scss',
            imageSlider: 'src/style/home/imageslider.scss',
            global: 'scr/style/common/**/*.scss',
            services: 'src/style/services/**/*.scss',
            blog: 'src/style/blog/*.scss',
            blog_inner: 'src/style/blog/blog-inner/**/*.scss',
            not: 'src/style/404/**/*.scss',
            career: 'src/style/career/**/*.scss',
            masonry: 'src/style/career/masonry.scss',
            about: 'src/style/about/**/*.scss',
            contact: 'src/style/contact/**/*.scss',
            hire: 'src/style/hire/**/*.scss',
        },
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        icons: 'src/webfonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'srs/fonts/**/*.*',
        icons: 'src/webfonts/**/*.*'
    },
    clean: './build/*'
};

/* Server Setting */
var config = {
    server: {
        baseDir: './build'
    },
    notify: false
};

var addStyle = '1';
var addJs = '1';
var app = {};

/* Include gulp and plugins */
var gulp = require('gulp'),  //  Gulp
    webserver = require('browser-sync'), //  server for working and automatic page refresh
    plumber = require('gulp-plumber'), // error tracking module
    include = require('gulp-include'), // module for importing the contents of one file into another
    sourcemaps = require('gulp-sourcemaps'), //  module for generating a map of source files
    sass = require('gulp-sass'), // module for compiling SASS (SCSS) in CSS
    autoprefixer = require('gulp-autoprefixer'), // module for automatic installation of auto prefixes
    cleanCSS = require('gulp-clean-css'), // plugin to minimize CSS
    //uglify = require('gulp-uglify'), // module to minimize JavaScript
    terser = require('gulp-terser'), // minimize javscript
    cache = require('gulp-cache'), // module for caching
    // imagemin = require('gulp-imagemin'), // plugin for compressing PNG, JPEG, GIF and SVG images
    // jpegrecompress = require('imagemin-jpeg-recompress'), // plugin for jpeg compression
    // pngquant = require('imagemin-pngquant'), // plugin to compress png
    rimraf = require('gulp-rimraf'), // plugin to delete files and directories
    concat = require('gulp-concat'), //concating files
    rename = require('gulp-rename');

/**create individual css */
app.addStyle = function(paths, folder, outputFilename) {
    return gulp.src(paths)
    .pipe(plumber()) // bug tracking
    .pipe(sourcemaps.init()) // sourcemap
    .pipe(sass()) // scss -> css
    .pipe(concat(outputFilename))
    .pipe(autoprefixer()) // add autoprefix
    .pipe(gulp.dest(folder))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS()) // minify CSS
    .pipe(sourcemaps.write('./')) //  write sourcemap
    .pipe(gulp.dest(folder)) // upload to build
    .pipe(webserver.reload({ stream: true })); // reload server
};

app.addJs = function(paths, folder, outputFilename) {
    return gulp.src(paths)
    .pipe(plumber()) // bug tracking
    .pipe(include()) // import all files to main.js
    .pipe(gulp.dest(folder))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.init()) // sourcemap
    .pipe(terser()) // minify js
    .pipe(concat(outputFilename))
    .pipe(sourcemaps.write('./')) // write sourcemap
    .pipe(gulp.dest(folder)) // upload to build
    .pipe(webserver.reload({ stream: true })); // reload
};


/* tasks */

// Server start
gulp.task('webserver', function () {
    webserver(config);
});

// html collection
gulp.task('html:build', function () {
    return gulp.src(path.src.html) // selection of all html files in the specified path
        .pipe(plumber()) // bug tracking
        .pipe(include()) // import attachments
        .pipe(gulp.dest(path.build.html)) // uploading finished files
        .pipe(webserver.reload({ stream: true })); // server reboot
});

// collection of styles
gulp.task('css:build', function (cb) {
    gulp.src(path.src.style.main)
    .pipe(plumber()) // bug tracking
    .pipe(sourcemaps.init()) // sourcemap
    .pipe(sass()) // scss -> css
    .pipe(autoprefixer()) // add autoprefix
    .pipe(gulp.dest(path.build.css.general))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS()) // minify CSS
    .pipe(sourcemaps.write('./')) //  write sourcemap
    .pipe(gulp.dest(path.build.css.general)) // upload to build
    .pipe(webserver.reload({ stream: true })); // reload server
    app.addStyle([path.src.style.home], [path.build.css.home], 'home.css');
    app.addStyle([path.src.style.imageSlider], [path.build.css.home], 'imageslider.css');
    app.addStyle([path.src.style.about], [path.build.css.about],'about.css');
    app.addStyle([path.src.style.global], [path.build.css.global],'global.css');
    app.addStyle([path.src.style.services], [path.build.css.services],'services.css');
    app.addStyle([path.src.style.career], [path.build.css.career],'career.css');
    app.addStyle([path.src.style.masonry], [path.build.css.career],'masonry.css');
    app.addStyle([path.src.style.hire], [path.build.css.hire],'hire.css');
    app.addStyle([path.src.style.blog], [path.build.css.blog],'blog.css');
    app.addStyle([path.src.style.blog_inner], [path.build.css.blog_inner],'blog-inner.css');
    app.addStyle([path.src.style.not], [path.build.css.not],'not.css');
    app.addStyle([path.src.style.contact], [path.build.css.contact],'contact.css');
    return cb();
});

// сбор js
gulp.task('js:build', function (cb) {
        gulp.src(path.src.js.main) // Got main.js
        .pipe(plumber()) // bug tracking
        .pipe(include()) // import all files to main.js
        .pipe(gulp.dest(path.build.js.general))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.init()) // sourcemap
        .pipe(terser()) // minify js
        .pipe(sourcemaps.write('./')) // write sourcemap
        .pipe(gulp.dest(path.build.js.general)) // upload to build
        .pipe(webserver.reload({ stream: true })); // reload
        app.addJs([path.src.js.home], [path.build.js.home], 'home.js');
        app.addJs([path.src.js.about], [path.build.js.about], 'about.js');
        app.addJs([path.src.js.services], [path.build.js.services], 'services.js');
        app.addJs([path.src.js.career], [path.build.js.career], 'career.js');
        app.addJs([path.src.js.hire], [path.build.js.hire], 'hire.js');
        app.addJs([path.src.js.blog], [path.build.js.blog], 'blog.js');
        app.addJs([path.src.js.blog_inner], [path.build.js.blog_inner], 'blog-inner.js');
        app.addJs([path.src.js.not], [path.build.js.not], 'not.js');
        app.addJs([path.src.js.contact], [path.build.js.contact], 'contact.js');
        return cb();
});

// Fonts build
gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});
//font awesome
gulp.task('icons:build', function() {
    return gulp.src(path.src.icons)
        .pipe(gulp.dest(path.build.icons));
});

// IMAGES
gulp.task('image:build', function () {
    return gulp.src(path.src.img)
        // .pipe(cache(imagemin([
        //     imagemin.gifsicle({ interlaced: true }),
        //     jpegrecompress({
        //         progressive: true,
        //         max: 90,
        //         min: 80
        //     }),
        //     pngquant(),
        //     imagemin.svgo({ plugins: [{ removeViewBox: false }] })
        // ])))
        .pipe(gulp.dest(path.build.img)); // выгрузка готовых файлов
});

// Remove build
gulp.task('clean:build', function () {
    return gulp.src(path.clean, { read: false })
        .pipe(rimraf());
});

// Clear cache
gulp.task('cache:clear', function () {
    cache.clearAll();
});

// BUILD PROJECT
gulp.task('build',
    gulp.series('clean:build',
        gulp.parallel(
            'html:build',
            'css:build',
            'fonts:build',
            'image:build',
            'icons:build',
            'js:build'
        )
    )
);

// WATCH PROJECT
gulp.task('watch', function () {
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.css, gulp.series('css:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
    gulp.watch(path.watch.fonts, gulp.series('icons:build'));
});

// DEFAULT
gulp.task('default', gulp.series(
    'build',
    gulp.parallel('webserver','watch')
));

