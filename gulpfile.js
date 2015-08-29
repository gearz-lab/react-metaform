var gulp = require('gulp');
var rimraf = require('rimraf-promise');
var colors = require('colors');
var exec = require('child-process-promise').exec;

gulp.task('build-dist', function () {
    return rimraf('./dist').then(function (error) {
        var webpackCli = 'webpack --bail';
        var webpackCliProduction = 'webpack --bail -p';
        return exec(webpackCli).fail(function (error) {
            console.log(colors.red(error))
        })
            .then(function () {
                exec(webpackCliProduction).fail(function (error) {
                    console.log(colors.red(error));
                });
            });
    });
});