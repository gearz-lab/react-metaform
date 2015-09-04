import fs from 'fs';
import React from 'react';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../webpack/webpack.config.docs.prod.js';
import Router from 'react-router';
import routes from './Routes';

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const development = process.env.NODE_ENV !== 'production';
let app = express();

if (development) {

    let publicPath = webpackConfig.output.publicPath;

    webpackConfig.output.path = '/';
    webpackConfig.output.publicPath = undefined;

    app = app
        .use(function renderApp(req, res) {
            Router.run(routes, req.url, Handler => {
                let routeHtml = React.renderToString(<Handler />);
                if(routeHtml.indexOf('<noscript') === 0) {
                    routeHtml = '';
                }
                let wrap = require('../docs/pages/BasePage.txt')
                    .replace(/\$\{routeHtml\}/g, routeHtml)
                    .replace(/\$\{cssBundlePath\}/g, '')
                    .replace(/\$\{jsBundlePath\}/g, 'http://localhost:8082/assets/bundle.js');
                res.send(wrap);
            });
        });
} else {
    app = app
        .use(express.static(path.join(__dirname, '../docs-built')));
}

app
    .listen(4000, function () {
        console.log('Server started at http://localhost:4000');
    });
