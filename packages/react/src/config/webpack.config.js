const path = require('path');
const { NoEmitOnErrorsPlugin, HotModuleReplacementPlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');
const PostCssPresetEnv = require('postcss-preset-env');
const PostCssFlexFixes = require('postcss-flexbugs-fixes');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      require.resolve('babel-plugin-istanbul'), {
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

/**
 * Get a list of loaders to process styles.
 *
 * Always includes PostCSS and css-loader. In dev it will emit <style> tags,
 * in prod it will emit a single CSS bundle.
 *
 * @param isProd
 * @param customLoader If passed, we will add it at the end of the list.
 */
function getStyleLoaders(isProd, customLoader) {
  return [
    // Add <style> tags in dev, <link> in prod.
    !isProd ? require.resolve('style-loader') : {
      loader: MiniCssExtractPlugin.loader
    }, {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: true
      }
    }, {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          PostCssFlexFixes,
          PostCssPresetEnv({
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3
          }),
          postcssNormalize()
        ],
        sourceMap: true
      }
    }, customLoader && {
      loader: require.resolve(customLoader),
      options: {
        sourceMap: true
      }
    }
  ].filter(Boolean);
}

module.exports = webpackEnv => {
  const isProd = webpackEnv === 'production';

  return {
    output: {
      filename: isProd ? '[name].[contentHash].js' : '[name].js',
      path: path.join(process.cwd(), 'build')
    },

    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'sourcemap' : 'cheap-module-source-map',

    ...(!isProd ? {
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
          use: getStyleLoaders(isProd, 'less-loader')
        }, {
          test: /\.css$/,
          use: getStyleLoaders()
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
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html')
      }),
      ...(!isProd ? [new HotModuleReplacementPlugin()] : [])
    ]
  };
};
