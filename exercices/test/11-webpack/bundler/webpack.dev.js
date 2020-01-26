const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            contentBase: './dist',
            open: true
        },
        module:
        {
            rules:
            [
                {
                    test: /\.styl$/,
                    use:
                    [
                        'style-loader',
                        'css-loader',
                        'stylus-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    use:
                    [
                        'style-loader',
                        'css-loader'
                    ]
                }
            ]
        }
    }
)