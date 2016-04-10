import fs from 'fs';
import React from 'react';
import ReactDom from 'react-dom';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../webpack/webpack.config.demo.prod.js';
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import routes from './Routes'
import colors from 'colors';

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const development = process.env.NODE_ENV !== 'production';
let app = express();

if (development) {

    webpackConfig.output.path = '/';
    webpackConfig.output.publicPath = undefined;

    app = app
        .use(function renderApp(req, res) {

            match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
                if (error) {
                    res.status(500).send(error.message)
                } else if (redirectLocation) {
                    res.redirect(302, redirectLocation.pathname + redirectLocation.search)
                } else if (renderProps) {

                    let wrap = require('../demo/pages/BasePage.txt')
                        .replace(/\$\{cssBundlePath\}/g, '')
                        .replace(/\$\{jsBundlePath\}/g, 'http://localhost:8082/assets/bundle.js');
                    res.status(200).send(wrap);

                } else {
                    res.status(404).send('Not found')
                }
            });

        });
} else {
    app = app
        .use(express.static(path.join(__dirname, '../demo-built')));
}

app
    .listen(4000, function () {
        console.log(colors.green(`React-metaform started at http://localhost:4000/react-metaform/demo.html. NODE_ENV: ${process.env.NODE_ENV}`));
    });
