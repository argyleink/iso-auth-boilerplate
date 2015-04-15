// Webpack configuration
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
require('strip-loader');

module.exports = {
  cache: true,
  progress: true,
  colors: true,
  entry: {
    client: './client.js',
    main: './src/less/main.less'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!react-router)/,
        loaders: [
          'babel-loader?stage=0',
          'strip-loader?strip[]=debug'
        ]
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!less-loader!autoprefixer-loader?browsers=last 5 version')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.less']
  },
  plugins: [
    // Optimize
    new webpack.NormalModuleReplacementPlugin(
      /debug/, process.cwd() + '/utils/noop.js'
    ),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        // Signal production mode for React JS libs.
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CompressionPlugin({
      asset: '{file}',
      algorithm: 'gzip',
      regExp: /\.js$|\.html$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};