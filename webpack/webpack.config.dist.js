import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    entry: [
        './src/index.js'
    ],

    output: {
        filename: '[name].js',
        path: './dist',
        library: 'react-metaform',
        libraryTarget: 'umd'
    },

    externals: [
        {
            'react': {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        }
    ],

    resolve: {
        extensions: ['', '.js', '.json', 'txt']
    },

    module: {
        loaders: [
            {test: /\.js/, loaders: ['babel'], exclude: /node_modules/ },
            {test: /\.jsx/, loaders: ['babel'], exclude: /node_modules/ },
            {test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.less$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            {test: /\.json$/, loader: 'json'},
            {test: /\.jpe?g$|\.gif$|\.png$|\.ico$/, loader: 'file?name=[name].[ext]'},
            {test: /\.eot|\.ttf|\.svg|\.woff2?/, loader: 'file?name=[name].[ext]'},
            {test: /\.txt/, loader: 'raw'}
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "'production'",
                APP_ENV: JSON.stringify('browser')
            }
        })
    ]
};
