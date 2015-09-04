import fs from 'fs';
import colors from 'colors';
import React from 'react';
import Router from 'react-router';
import path from 'path';
import rimraf from 'rimraf-promise';
import fsep from 'fs-extra-promise';
import { exec } from 'child-process-promise';
import Routes from '../docs/Routes.js';

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const repoRoot = path.resolve(__dirname, '../');
const docsBuilt = path.join(repoRoot, 'docs-built');

const licenseSrc = path.join(repoRoot, 'LICENSE');
const licenseDest = path.join(docsBuilt, 'LICENSE');

console.log(licenseSrc);
console.log(licenseDest);

console.log('building docs'.green);
if(process.env.NODE_ENV !== 'production') {
    console.log(`build-docs can only run in production. Current NODE_ENV: ${process.env.NODE_ENV}`.red);
    process.exit();
}

let pages = ['home.html', 'liveSchemaEditor.html'];

rimraf(docsBuilt)
    .then(() => fsep.mkdir(docsBuilt))
    .then(() => {
        console.log('writing static page files...');
        return pages.map(fileName => new Promise((resolve, reject) => {
            Router.run(Routes, '/' + fileName, Handler => {
                let routeHtml = React.renderToString(React.createElement(Handler));
                if(routeHtml.indexOf('<noscript') === 0) {
                    routeHtml = '';
                }
                let wrap = require('../docs/pages/BasePage.txt')
                    .replace(/\$\{routeHtml\}/g, routeHtml)
                    .replace(/\$\{cssBundlePath\}/g, 'assets/main.css')
                    .replace(/\$\{jsBundlePath\}/g, 'assets/bundle.js')
                return fsep.writeFile(path.join(docsBuilt, fileName), wrap)
                    .then(write => resolve(write));
            });
        }));
    })
    .then(() => {
        console.log('running webpack on webpack.config.docs.js...');
        return exec(`webpack --config webpack.config.docs.prod.js`);
    })
    // for some reason, fsep.copy is not working anymore :(
    .then(() => new Promise(function(resolve, reject) {
        console.log('copying license files...');
        var rd = fs.createReadStream(licenseSrc);
        rd.on('error', reject);
        var wr = fs.createWriteStream(licenseDest);
        wr.on('error', reject);
        wr.on('finish', resolve);
        rd.pipe(wr);
    }))
    .then(() => console.log('docs built'.green));
