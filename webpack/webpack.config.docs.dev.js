import webpack from 'webpack';

export default {
    entry: [
        'webpack-dev-server/client?http://localhost:8082',
        'webpack/hot/only-dev-server',
        './docs/Client.js'
    ],

    output: {
        filename: 'bundle.js',
        path: './docs-built/assets',
        publicPath: 'http://localhost:8082/assets/'
    },

    externals: undefined,

    resolve: {
        extensions: ['', '.js', '.json']
    },

    module: {
        loaders: [
            {test: /\.js/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            {test: /\.jsx/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            {test: /\.css/, loader: 'style-loader!css-loader'},
            {test: /\.less$/, loader:  'style!css!less'},
            {test: /\.json$/, loader: 'json'},
            {test: /\.jpe?g$|\.gif$|\.png$|\.ico$/, loader: 'file?name=[name].[ext]'},
            {test: /\.eot|\.ttf|\.svg|\.woff2?/, loader: 'file?name=[name].[ext]'}
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],

    // the configuration above does not apply to the webpack-dev-server...
    // webpack-dev-server is configured below
    devServer: {
        contentBase: "./docs-built",
        hot: true,
        noInfo: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        port: 8082
    }
};
