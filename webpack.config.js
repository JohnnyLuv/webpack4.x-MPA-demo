const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 模版生成html
const CleanWebpackPlugin = require('clean-webpack-plugin') // 每次打包前进行清理
// const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝静态资源
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 把css从页面中抽离成单独的文件
const OptimizeCss = require('optimize-css-assets-webpack-plugin') // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
  devtool: 'source-map', // 源码映射，开发环境调试使用
  mode: 'development', // production / development
  optimization: {
    minimizer: [
      new OptimizeCss(), // 压缩css，仅在 'production' 模式下生效
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      })
    ]
  },
  entry: {
    index: './src/js/index.js',
    home: './src/js/home.js'
  },
  output: {
    // [name] => index, home
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(), // 打包前清理
    /* new CopyWebpackPlugin([ // 拷贝静态文件
      {
        from: path.resolve(__dirname, 'src/img'),
        to: './img'
      }
    ]), */
    new MiniCssExtractPlugin({ // 抽离css
      // filename: './css/index.css',
      filename: './css/[name].css',
      chunkFilename: './css/[id].css',
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      title: 'index page',
      chunks: ['index'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/home.html',
      filename: './home.html',
      chunks: ['home'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/, // 打包 html 中的图片
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/, // 打包图片
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000, // 把小于1000B的文件打成Base64的格式，写入JS
            name: 'img/[name]-[hash:6].[ext]',
            // publicPath: "../dist/img/",
            // outputPath: "img/",
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env' // es6 转 es5
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 抽离css
            options: {
              publicPath:'../'
            }
          },
          // 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 抽离css
            options: {
              publicPath:'../'
            }
          },
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
}