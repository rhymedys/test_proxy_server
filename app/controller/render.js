/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-16 16:41:41
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-01 18:17:35
 */

'use strict';
const fs = require('fs');
const Controller = require('egg').Controller;
const publicKey = fs.readFileSync('./rsa_public_key.pem', 'utf8');
class RenderController extends Controller {

  async renderLogin() {
    await this.ctx.render(
      'login/index.ejs',
      {
        encryptKey: publicKey.replace(/\n/g, '\\n'),
      }
    );
  }
}

module.exports = RenderController;
