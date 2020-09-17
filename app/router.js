/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-24 11:16:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2020-09-17 15:34:37
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
  router.get('/test-proxy/h5/content', checkTokenIsLogin, controller.render.renderContent);


  // 登录
  router.post('/test-proxy/api/v1/login', controller.v1.login.login);

  // api
  router.post('/test-proxy/api/v1/insertApi', checkTokenIsLogin, controller.v1.api.insert)
  router.post('/test-proxy/api/v1/updateApi', checkTokenIsLogin, controller.v1.api.update)
  router.get('/test-proxy/api/v1/deleteByUserIdAndAppId', checkTokenIsLogin, controller.v1.api.deleteByUserIdAndAppId)

  
  // proxy
  router.get('/test-proxy/proxy/**', controller.v1.proxy.get)
  router.post('/test-proxy/proxy/**', controller.v1.proxy.post)
  router.get('/test-proxy/http-proxy/**', controller.v1.proxy.getByHttp)
  router.post('/test-proxy/http-proxy/**', controller.v1.proxy.postByHttp)


  router.get('/recommandapi/updatewx', controller.wxrecommand.index.update)
  router.get('/recommandapi/findByDataId', controller.wxrecommand.index.findByDataId)


  
};
