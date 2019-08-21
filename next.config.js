/* eslint-disable no-param-reassign */
require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');
const withCSS = require('@zeit/next-css');

const isProd = process.env.NODE_ENV === 'production';
console.log('===== process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = withCSS({
  assetPrefix: isProd ? 'https://rafaelbastiani.com' : '',
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ];

    return config;
  }
});
