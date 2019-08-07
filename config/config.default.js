'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  config.cluster = {
    listen: {
      port: 7002,
      hostname: '127.0.0.1',
      // path: 'test-proxy',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532401204088_0501';

  // add your config here
  config.middleware = [];

  config.WXMiniProgramInfo = {
    appid: 'wx5aa27a03d5399059',
    secret: '56730088c4d53cafb62229cab23147bf',
    js_code: '',
    grant_type: 'authorization_code',
  };


  config.mongoose = {
    client: {
      url: 'mongodb://localhost:27017/test_proxy_server',
      options: {
        useNewUrlParser: true,
      },
    },
  };

  // config.middleware = [ 'checkSession' ];

  config.security = {
    csrf: {
      ignoreJSON: false,
      cookieName: 'csrfToken',
      sessionName: 'csrfToken',
      headerName: 'x-csrf-token',
      enable: false
    },
    xframe: {
      enable: true,
    },
    domainWhiteList: [
      'http://localhost:7003'
    ]
  };


  config.cors = {
    origin:'http://localhost:7003',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // config/config.prod.js
  config.assets = {
    publicPath: '/public/',
  };

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    mapping: {
      '.ejs': 'ejs',
    },
  };

  return config;
};
