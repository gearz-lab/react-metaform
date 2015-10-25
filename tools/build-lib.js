import path from 'path';
var fsep = require('fs-extra-promise');
var rimraf = require('rimraf-promise');
var colors = require('colors');
var exec = require('child-process-promise').exec;

console.log('building lib'.green);

const repoRoot = path.resolve(__dirname, '../');
const lib = path.join(repoRoot, 'lib');
const lessSrc = path.join(repoRoot, '/src/less');
const lessDest = path.join(lib, '/less');

rimraf(lib)
    .then(function (error) {
        let babelCli = 'babel --optional es7.objectRestSpread ./src --out-dir ./lib';
        return exec(babelCli).fail(function (error) {
            console.log(colors.red(error))
        });
    })
    .then(() => fsep.copyAsync(lessSrc, lessDest))
    .then(() => console.log('lib built'.green));
