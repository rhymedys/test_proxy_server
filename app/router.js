/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-24 11:16:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-07 23:19:22
 */

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  // const checkSession = middleware.checkSession(null, app);
  const checkTokenIsLogin = middleware.checkToken();
  const checkIsLogin = middleware.checkIsLogin();

  router.get('/', controller.test.index);
  router.get('/test-proxy/h5/login', controller.render.renderLogin);


  // 登录
  router.post('/test-proxy/api/v1/login', controller.v1.login.login);

  // api
  router.post('/test-proxy/api/v1/insertApi', checkTokenIsLogin, controller.v1.api.insert)
  router.get('/test-proxy/api/v1/deleteByUserIdAndAppId', checkTokenIsLogin, controller.v1.api.deleteByUserIdAndAppId)

  // proxy
  router.get('/test-proxy/proxy/**', controller.v1.proxy.get)
  router.post('/test-proxy/proxy/**', controller.v1.proxy.post)
};
