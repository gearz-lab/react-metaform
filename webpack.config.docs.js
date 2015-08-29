/* eslint no-var: 0 */
require('./register-babel');
process.env.NODE_ENV = 'webpack';
var config = require('./webpack/webpack.config.docs.js');
module.exports = config;
