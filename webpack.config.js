module.exports = {
    entry: [
        './app/RouteConfig.js'
    ],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                test: /\.jsx?$/,
                loader: 'babel'
            }
        ]
    }
}