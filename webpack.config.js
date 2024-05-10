import 'dotenv/config';
import path from 'path';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const outputDirectory = 'dist';

// Get the directory name using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.resolve(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: '/', // Ensure correct path resolution for assets
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Convert images < 8kb to base64 strings
              name: 'images/[name].[ext]', // Define image output path
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: './',
    historyApiFallback: true,
    port: parseInt(process.env.CLIENT_PORT, 10) || 3000, // Default port to 3000 if not specified
    open: process.env.OPEN_BROWSER === 'true',
    proxy: {
      '/api': `http://localhost:${process.env.API_PORT}`,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new Dotenv({
      safe: false,
    }),
  ],
};
