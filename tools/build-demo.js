import fs from 'fs';
import colors from 'colors';
import React from 'react';
import path from 'path';
import rimraf from 'rimraf-promise';
import fsep from 'fs-extra-promise';
import { exec } from 'child-process-promise';
import routes from '../demo/Routes.js';
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const repoRoot = path.resolve(__dirname, '../');
const demoBuilt = path.join(repoRoot, 'demo-built');

const licenseSrc = path.join(repoRoot, 'LICENSE');
const licenseDest = path.join(demoBuilt, 'LICENSE');

console.log('building demo'.green);
if(process.env.NODE_ENV !== 'production') {
    console.log(`build-docs can only run in production. Current NODE_ENV: ${process.env.NODE_ENV}`.red);
    process.exit();
}

rimraf(demoBuilt)
    .then(() => fsep.mkdir(demoBuilt))
    .then(() => {
        console.log('writing static page files...');

        let wrap = require('../demo/pages/BasePage.txt')
            .replace(/\$\{cssBundlePath\}/g, 'assets/main.css')
            .replace(/\$\{jsBundlePath\}/g, 'assets/bundle.js');

        let demoHtmlPath = path.join(demoBuilt, 'demo.html');
        return fsep.writeFile(demoHtmlPath, wrap);

    }).catch(e=> console.log(e))
    .then(() => {
        console.log('running webpack on webpack.config.demo.prod.js...');
        return exec(`webpack --config webpack.config.demo.prod.js`);
    })
    .then(() => fsep.copyAsync(licenseSrc, licenseDest))
    .then(() => console.log('demo built'.green));
