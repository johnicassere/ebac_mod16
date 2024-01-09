const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify =  require('gulp-uglify');
const obsfucate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');


function comprimeImagens() {
    return gulp.src('./source/imagens/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/imagens'))
}


function comprimeJs() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obsfucate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass (){
    return gulp.src('./source/style/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/style'))
}


exports.default = function(){
    gulp.watch('./source/style/*.scss', {ignoreInitial:false}, gulp.series(compilaSass))
    gulp.watch('./source/scripts/*.js', {ignoreInitial:false}, gulp.series(comprimeJs))
    gulp.watch('./source/imagens/*', {ignoreInitial:false}, gulp.series(comprimeImagens))
}
