var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader!babel-loader'
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
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};