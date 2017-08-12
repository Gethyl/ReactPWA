var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  context: path.join(__dirname, "src"),
  devtool:  "inline-sourcemap",
  entry: {
    bundle:"./js/client.js",
    vendor: [
      "material-ui","material-ui-icons", "react-tap-event-plugin",
      "react","react-dom",
      "react-redux","redux",
      "react-router","react-router-dom", "redux-thunk"
    ],
  }, 
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules=true&camelCase=true']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=./images/[name].[ext]',
          'image-webpack-loader'
        ]

      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    //libraryTarget: "umd", //uncomment this if you want to build in UMD
    filename: "app.bundle.js"
  },
  plugins: debug ? [
    // new ExtractTextPlugin({filename: '[name].css', allChunks: false}),
     new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
  ] : [
    // new ExtractTextPlugin({filename: '[name].css', allChunks: false}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
  devServer: {
    // historyApiFallback: true,
    compress:true,   //Good practice to add this to compress the files while sending.
    contentBase: './',
  },
};