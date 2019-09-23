const path = require('path');
const { NoEmitOnErrorsPlugin, HotModuleReplacementPlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const babelLoader = {
  loader: require.resolve('babel-loader'),
  // The following options should match jest-transform.
  options: {
    auxiliaryCommentBefore: ' istanbul ignore next ',
    babelrc: false,
    caller: {
      name: '@jest/transform',
      supportsStaticESM: false
    },
    configFile: false,
    plugins: [[
      'istanbul', {
        compact: false,
        exclude: [],
        useInlineSourceMaps: false
      }
    ]]
  }
};

const tsLoader = {
  loader: require.resolve('ts-loader'),
  options: {
    // Type checking is done by fork-ts-checker-webpack-plugin.
    transpileOnly: true,
    compilerOptions: {
      // This should match the ts-jest config.
      target: 'es6'
    }
  }
};

module.exports = webpackEnv => {
  const isProd = webpackEnv === 'production';

  return ({
    output: {
      filename: isProd ? '[name].[contentHash].js' : '[name].js',
      path: path.join(process.cwd(), 'build')
    },

    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'sourcemap' : 'cheap-module-source-map',

    ...(isProd ? {
      devServer: {
        host: '0.0.0.0',
        port: 3000,
        disableHostCheck: true,
        hot: !!process.env.COVERAGE,
        stats: 'errors-only'
      }
    } : {}),

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: process.env.COVERAGE ? [babelLoader, tsLoader] : [tsLoader]
        }, {
          test: /\.less$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'less-loader']
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }]
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },

    plugins: [
      new NoEmitOnErrorsPlugin(),
      new ForkTsCheckerWebpackPlugin({
        async: !isProd,
        // Don't compile tests and fixtures.
        reportFiles: [
          'src/**/*',
          '!**/?(*.)(spec|test).*'
        ]
      }),
      ...(isProd ? [new HotModuleReplacementPlugin()] : [])
    ]
  });
};
