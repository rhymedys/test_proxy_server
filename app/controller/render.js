/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-16 16:41:41
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2020-09-18 10:01:06
 */

'use strict';
const fs = require('fs');
const Controller = require('egg').Controller;
const publicKey = fs.readFileSync('./rsa_public_key.pem', 'utf8');

const response = require('../extend/response');


class RenderController extends Controller {

  async renderLogin() {


    await this.ctx.render(
      'login/index.ejs', {
        encryptKey: publicKey.replace(/\r\n/g, '\\n'),
      }
    );
  }

  async renderContent() {
    const {
      ctx
    } = this;

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
          'content/index.ejs', {
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

  async renderRecomandWx() {


    const {
      ctx
    } = this;


    // console.log(ctx.request.host)
    this.logger.error(ctx.request.host)
    // this.logger.error(ctx.request)
    const dataId = ctx.request.host

    const res = await ctx.service.wxrecommand.findByDataId(
      dataId
    ).catch(e => {
      this.logger.error(e);
      response.sendFail(ctx);
    });


    if (res) {
      await this.ctx.render(
        'wxrecommand/index.ejs', {
          initState: JSON.stringify(res)
        }
      );
    } else {
      await ctx.service.wxrecommand.update({
        dataId,
        wx: '1'
      }).catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      })


      this.renderRecomandWx.call(this)
    }


  }



  async renderChangewxrecommandId() {


    await this.ctx.render(
      'changewxrecommandid/index.ejs', {}
    );



  }
}

module.exports = RenderController;