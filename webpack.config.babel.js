import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'

import developmentConfig from './config/environments/development'
import productionConfig from './config/environments/production'

const commonConfig = {
  resolve: {
    modules: ['node_modules', 'app/assets/apps/', 'app/assets/shared', 'app/assets/'],
    extensions: ['.js', '.css', '.scss']
  },
  context: path.resolve('app/assets'),
  entry: {
    styles: './stylesheets/application.scss',
    new_document: ['babel-polyfill', './apps/new_document/index.js']
  },
  output: {
    path: path.resolve('tmp/assets'),
    filename: '[name].js'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s?[ac]ss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `images/[name]${process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? '-[hash]' : ''}.[ext]`
            }
          }
        ]
      }
    ]
  }
}

let config = {}
switch (process.env.NODE_ENV) {
  case 'production':
    config = merge.smart(commonConfig, productionConfig)
    break
  case 'development':
  default:
    config = merge.smart(commonConfig, developmentConfig)
    break
}

export default config
