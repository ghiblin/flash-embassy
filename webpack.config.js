const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx',
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
};
