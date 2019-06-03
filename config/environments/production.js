import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import HoneybadgerSourceMapPlugin from '@honeybadger-io/webpack'
import TerserPlugin from 'terser-webpack-plugin'

const revision = process.env.GIT_REVISION || 'master'
const honeybadgerJsApiKey = process.env.HONEYBADGER_JS_API_KEY || ''

const productionConfig = {
  mode: 'production',
  output: {
    path: path.resolve('tmp/assets'),
    publicPath: '/app/assets/',
    filename: '[name]-[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: false
        },
        warnings: false,
        ie8: true,
        compress: {
          unused: true,
          dead_code: true,
          drop_console: true
        }
      },
      sourceMap: true
    })]
  },
  plugins: [
    new webpack.DefinePlugin({
      'DOCSKETCH_APP_SCHEME': JSON.stringify('https'),
      'DOCSKETCH_APP_HOST': JSON.stringify('www.docsketch.com'),
      'RELATIVE_URL_ROOT': JSON.stringify('/app/'),
      'GIT_REVISION': JSON.stringify(revision),
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HoneybadgerSourceMapPlugin({
      apiKey: honeybadgerJsApiKey,
      assetsUrl: 'https://www.docsketch.com/app/assets',
      revision
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/
    }),
    new CopyWebpackPlugin([
      {
        from: 'images/**/*',
        to: '[path][name]-[hash].[ext]'
      }
    ]),
    new ManifestPlugin({
      filter: file => !file.name.endsWith('.gz'),
      map: file => {
        file.name = file.name.replace(/-([a-f0-9]{32})\./, '.')
        file.name = file.name.replace(/^tmp\//, '')
        file.path = file.path.replace(/\/tmp\//, '/')
        return file
      }
    }),
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' })
  ]
}

export default productionConfig
