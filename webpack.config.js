const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname,'dist/server/server.js'),
  target:"node",
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /specific-file\.js$/, // 匹配特定的文件
        exclude: /node_modules/,   // 排除 node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", {
                targets: { ie: '6' }, // 指定 ES3 兼容性
                useBuiltIns: false,
                shippedProposals: true,
              }]
            ],
            plugins: [
              "@babel/plugin-transform-member-expression-literals",
              "@babel/plugin-transform-property-literals",
              "@babel/plugin-transform-reserved-words"
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true, // 启用代码压缩
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 删除所有 console 语句
            drop_debugger: true, // 删除所有 debugger 语句
          },
          output: {
            comments: false, // 删除所有注释
          },
        },
      }),
    ],
  },
};
