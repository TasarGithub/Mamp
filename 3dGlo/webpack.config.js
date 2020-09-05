const path = require('path');

module.exports = {
  entry: {
    main:'./src/index.js',
  }, 
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/dist'
  },
  devServer : {
    overlay: true
  },
  module: {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /'node_modeles'/
  }
};