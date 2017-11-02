const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'The Embassy Flash Cards',
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ],
      },
      // images
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: { limit: 10240 },
        }],
      },
      // Font
      {
        test: /\.svg(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 65000, mimetype: 'image/svg+xml' },
          },
        ],
      },
      {
        test: /\.woff(\?[a-z0-9=&.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 65000, mimetype: 'application/font-woff' },
        }],
      },
      {
        test: /\.woff2(\?[a-z0-9=&.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 65000, mimetype: 'application/font-woff2' },
        }],
      },
      {
        test: /\.[ot]tf(\?[a-z0-9=&.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 65000, mimetype: 'application/octet-stream' },
        }],
      },
      {
        test: /\.eot(\?[a-z0-9=&.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 65000, mimetype: 'application/vnd.ms-fontobject' },
        }],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};
