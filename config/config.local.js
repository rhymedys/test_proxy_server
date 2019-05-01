'use strict';
const path = require('path');
const ip = require('ip');
module.exports = app => {
  const exports = {};

  exports.view = {
    cache: false,
  };

  exports.static = {
    maxAge: 0, // maxAge 缓存，默认 1 年
  };

  exports.logview = {
    dir: path.join(app.baseDir, 'logs'),
  };

  exports.webpack = {
    // browser: 'http://localhost:7001',
    // webpackConfigList: require('easywebpack-vue').getWebpackConfig()
  };

  const localIP = ip.address();
  const domainWhiteList = [];
  [ 7001, 9000, 9001 ].forEach(port => {
    // domainWhiteList.push(`http://localhost:${port}`);
    // domainWhiteList.push(`http://127.0.0.1:${port}`);
    // domainWhiteList.push(`http://${localIP}:${port}`);
  });

  exports.security = { domainWhiteList };

  return exports;
};
