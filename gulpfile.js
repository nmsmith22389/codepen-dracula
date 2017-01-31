var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var stylelint = require('gulp-stylelint');
var gutil = require('gulp-util');

var inputSass = './src/*.scss';
var outputSass = './dist/';

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass:lint', function () {
    return gulp
        .src('src/scss/**/*.scss')
        .pipe(stylelint({
            failAfterError: false,
            reporters: [
                {formatter: 'string', console: true},
                {formatter: function(event) {
                    if (event[0].errored)  {
                        gulp.isE = true;
                    }
                }}
            ]
        }));
});

gulp.task('sass', function () {
    return gulp
        .src(inputSass)
        .pipe(stylelint({
            failAfterError: false,
            reporters: [
                {formatter: 'string', console: true}
            ]
        }))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(outputSass))
});

gulp.task('default', ['sass'], function() {
    gulp.watch('./src/**/*.scss', ['sass']);
})
