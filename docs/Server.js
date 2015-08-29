import fs from 'fs';
import React from 'react';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack/webpack.config.docs.js';
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
        .use(webpackMiddleware(webpack(webpackConfig), {
            noInfo: false,
            publicPath: publicPath,
            stats: {
                colors: true
            }
        }))
        .use(function renderApp(req, res) {
            Router.run(routes, req.url, Handler => {
                let routeHtml = React.renderToString(<Handler />);
                if(routeHtml.indexOf('<noscript') === 0) {
                    routeHtml = '';
                }
                let wrap = require('./pages/BasePage.txt').replace('${routeHtml}', routeHtml);
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
