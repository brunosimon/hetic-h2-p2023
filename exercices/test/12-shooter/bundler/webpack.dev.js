const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            contentBase: './dist',
            open: true,
            host: '0.0.0.0'
        }
    }
)