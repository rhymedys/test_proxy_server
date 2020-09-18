/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:35:34
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2020-09-18 10:14:11
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../../extend/response');

class WxrecommandController extends Controller {


    async update() {
        const {
            ctx,
        } = this;

        const {
            orgin,
            modify,
        } = ctx.request.query

        const {
            host
        } = ctx.request

        if (orgin && modify) {

            const dataId = host

            // this.logger.error(host)

            const res = await ctx.service.wxrecommand.findByDataId(
                dataId
            ).catch(e => {
                this.logger.error(e);
                response.sendFail(ctx);
            });

            // this.logger.info(res)

            if (res.wx === orgin) {
                const wxrecommandUpdateRes = await ctx.service.wxrecommand.update({
                    dataId,
                    wx: modify
                }).catch(e => {
                    this.logger.error(e);
                    response.sendFail(ctx);
                })


                console.log('res', wxrecommandUpdateRes)

                response.sendSuccess(ctx);


            } else {
                response.sendFail(ctx, '原微信号不存在');

            }



        } else {
            response.sendFail(ctx, 'orgin或modify为空');
        }
    }


    async findByDataId() {
        const {
            ctx
        } = this;

        const {

            query
        } = ctx.request



        if (query && query.dataId) {
            const res = await ctx.service.wxrecommand.findByDataId(
                decodeURIComponent(decodeURIComponent(query.dataId))
            ).catch(e => {
                this.logger.error(e);
                response.sendFail(ctx);
            });

            if (res) {
                response.sendSuccess(ctx, res);
            } else {
                response.sendFail(ctx)
            }
        } else {
            response.sendFail(ctx, 'dataId为空')
        }
    }


}

module.exports = WxrecommandController;