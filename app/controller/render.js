/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-16 16:41:41
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-12 15:28:50
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

  async renderContent() {
    const { ctx } = this;

    const {
        state,
    } = ctx

    if (state.tokenInfo.userId) {
        const res = await ctx.service.api.findByUserId(
            state.tokenInfo.userId
        ).catch(e => {
            this.logger.error(e);
            response.sendFail(ctx);
        });


        if (res) {
          await this.ctx.render(
            'content/index.ejs',
            {
              initState: JSON.stringify(res)
            }
          );

        } else {
            response.sendFail(ctx)
        }
    } else {
        response.sendFail(ctx, 'userId为空')
    }


  }
}

module.exports = RenderController;
