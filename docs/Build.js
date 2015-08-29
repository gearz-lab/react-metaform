import fs from 'fs';
import React from 'react';
import Router from 'react-router';
import path from 'path';
import rimraf from 'rimraf-promise';
import fsep from 'fs-extra-promise';
import { exec } from 'child-process-promise';
import Routes from './Routes.js';

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const repoRoot = path.resolve(__dirname, '../');
const docsBuilt = path.join(repoRoot, 'docs-built');

const licenseSrc = path.join(repoRoot, 'LICENSE');
const licenseDest = path.join(docsBuilt, 'LICENSE');

console.log(licenseSrc);
console.log(licenseDest);

console.log('Building docs');

let pages = ['home.html', 'liveSchemaEditor.html'];

rimraf(docsBuilt)
    .then(() => fsep.mkdir(docsBuilt))
    .then(() => {
        let writes = pages.map(fileName => new Promise((resolve, reject) => {
            Router.run(Routes, '/' + fileName, Handler => {
               let routeHtml = React.renderToString(React.createElement(Handler));
                if(routeHtml.indexOf('<noscript') === 0) {
                    routeHtml = '';
                }
                let wrap = require('./pages/BasePage.txt').replace('${routeHtml}', routeHtml);
                return fsep.writeFile(path.join(docsBuilt, fileName), wrap)
                    .then(write => resolve(write));
            });
        }));
    })
    .then(() => exec(`NODE_ENV=webpack&&webpack --config webpack.config.docs.js`))
    // for some reason, fsep.copy is not working anymore :(
    .then(() => new Promise(function(resolve, reject) {
        var rd = fs.createReadStream(licenseSrc);
        rd.on('error', reject);
        var wr = fs.createWriteStream(licenseDest);
        wr.on('error', reject);
        wr.on('finish', resolve);
        rd.pipe(wr);
    }))
    .then(() => console.log('Built docs'));
