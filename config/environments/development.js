import path from 'path'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'

const devHost = process.env.LOCAL_HOST || 'localhost'
const revision = process.env.GIT_REVISION || 'master'

const developmentConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'DOCSKETCH_APP_SCHEME': JSON.stringify('http'),
      'DOCSKETCH_APP_HOST': JSON.stringify(`${devHost}:3000`),
      'RELATIVE_URL_ROOT': JSON.stringify('/'),
      'GIT_REVISION': JSON.stringify(revision),
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new CopyWebpackPlugin([
      {
        from: 'images/**/*',
        to: '[path][name].[ext]'
      }
    ]),
    new ManifestPlugin({
      seed: {},
      writeToFileEmit: true,
      filter: file => !file.name.endsWith('.gz')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    hot: true,
    overlay: true,
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    publicPath: `http://${devHost}:8080/`,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  output: {
    path: path.resolve('public/assets'),
    publicPath: `http://${devHost}:8080/`,
    filename: '[name].js'
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
}

export default developmentConfig
