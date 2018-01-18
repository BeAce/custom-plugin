const path = require('path');
const webpack = require('webpack');
const MyPlugin = require('./my-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
  },
  plugins: [
    // new HelloWorldPlugin({ options: true }),
    new MyPlugin({ options: true }),
  ]
}
