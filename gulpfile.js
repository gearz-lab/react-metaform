var gulp = require('gulp');
var rimraf = require('rimraf-promise');
var colors = require('colors');
var exec = require('child-process-promise').exec;

gulp.task('build-dist', function () {
    return rimraf('./dist').then(function (error) {
        var webpackCli = 'webpack --config webpack.config.dist.js';
        return exec(webpackCli).fail(function (error) {
            console.log(colors.red(error))
        });
    });
});