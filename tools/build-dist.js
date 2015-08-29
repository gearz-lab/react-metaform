var gulp = require('gulp');
var rimraf = require('rimraf-promise');
var colors = require('colors');
var exec = require('child-process-promise').exec;

console.log('building dist'.green);
rimraf('./dist').then(function (error) {
    var webpackCli = 'webpack --config webpack.config.dist.js';
    return exec(webpackCli).fail(function (error) {
        console.log(colors.red(error))
    });
}).then(() => console.log('dist built'.green));

