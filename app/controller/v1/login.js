/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:35:34
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-01 20:18:39
 */

'use strict';
const fs = require('fs');
const Controller = require('egg').Controller;
const response = require('../../extend/response');
const uuidv1 = require('uuid/v1');
const tokenUtils = require('../../extend/token');
const cryptoUtils = require('../../extend/crypto');
const crypto = require('crypto');

const privateKey = fs.readFileSync('./rsa_private_key.pem', 'utf8');

class LoginController extends Controller {


  async login() {
    const {
      ctx,
    } = this;

    const {
      info,
    } = ctx.request.body;

    if (info) {

      let decryptLoginInfo;

      try {
        const secretInfoBuffer = new Buffer(info, 'base64');
        decryptLoginInfo = crypto.privateDecrypt({
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        }, secretInfoBuffer);

        decryptLoginInfo = decryptLoginInfo.toString('utf8');
        decryptLoginInfo = JSON.parse(decryptLoginInfo);
      } catch (e) {
        this.logger.error('Login decryptLoginInfo error', e);
        response.sendFail(ctx, '登录失败,decryptLoginInfo error');
      }

      if (decryptLoginInfo) {
        const userInfo = await ctx.service.user.findByUserId(decryptLoginInfo.id);


        if (userInfo && userInfo.password === cryptoUtils.cryptoByMd5(decryptLoginInfo.password)) {

          const token = uuidv1().replace(/\-/g, '');

          await ctx.service.token.insert({
            token,
            userId: decryptLoginInfo.id,
            expires: new Date().getTime() + 1000 * 60 * 60 * 2,
          });

          tokenUtils.setTokenToCookies(ctx, token);
          response.sendSuccess(ctx, '登录成功');

        } else {
          response.sendFail(ctx, '用户不存在或密码不正确');
        }
      } else {
        response.sendFail(ctx, '登录失败');
      }
    } else {
      response.sendFail(ctx, 'info为空');
    }
  }


  /**
   * 退出登录
   *
   * @memberof LoginController
   */
  async logout() {
    const { ctx } = this;
    await tokenUtils.deleteTokenByCookieToken(ctx).catch(e => {
      this.logger.error(e);
      response.sendSuccess(ctx);
    });
    response.sendSuccess(ctx);
  }
}

module.exports = LoginController;
