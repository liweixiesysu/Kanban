module.exports = {
    entry: [
        './app/RouteConfig.js'
    ],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
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