import webpack from 'webpack';

export default {
    entry: [
        'webpack-dev-server/client?http://localhost:8082',
        'webpack/hot/only-dev-server',
        './demo/Client.js'
    ],

    output: {
        filename: 'bundle.js',
        path: './demo-built/assets',
        publicPath: 'http://localhost:8082/assets/'
    },

    externals: undefined,

    //devtool: 'source-map',

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
            {test: /\.eot|\.ttf|\.svg|\.woff2?/, loader: 'file?name=[name].[ext]'},
            {test: /\.txt/, loader: 'raw'}
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                APP_ENV: JSON.stringify('browser')
            }
        })
    ],

    // the configuration above does not apply to the webpack-dev-server...
    // webpack-dev-server is configured below
    devServer: {
        contentBase: "./demo-built",
        hot: true,
        noInfo: false,
        headers: { 'Access-Control-Allow-Origin': '*' },
        port: 8082
    }
};
