const path = require('path'); // Node.js модуль для разрешения путей файлов
const HtmlWebpackPlugin = require('html-webpack-plugin'); // устанавливается через npm
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      // favicon: './src/favicon.ico',
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options:{
            presets:["@babel/preset-env", "@babel/preset-react"]
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      // {
      //   test: /\.(png)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         esModule: false,
      //         name: 'img/[name].[ext]',
      //       },
      //     },
      //   ],
      // },
    ],
  },
};
