/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:35:34
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-07 23:59:25
 */

'use strict';
const fs = require('fs');
const Controller = require('egg').Controller;
const response = require('../../extend/response');
const uuidv1 = require('uuid/v1');
const tokenUtils = require('../../extend/token');


class ApiController extends Controller {


    /**
     * 插入
     *
     * @memberof LoginController
     */
    async insert() {
        const { ctx } = this;

        const {
            body,
        } = ctx.request
        const {
            state,
        } = ctx
        if (body) {
            let loginDataStr = JSON.stringify(body.loginData)

            body.loginData = loginDataStr
            body.userId = state.tokenInfo.userId
            body.appId = uuidv1()
            const res = await ctx.service.api.insert(
                body
            ).catch(e => {
                this.logger.error(e);
                response.sendFail(ctx);
            });


            console.log('res',res)
            response.sendSuccess(ctx);


        } else {
            response.sendFail(ctx)
        }

    }


    /**
     * @description 删除配置
     * @memberof ApiController
     */
    async deleteByUserIdAndAppId() {
        const { ctx } = this;

        const {

            query
        } = ctx.request

        const {
            state,
        } = ctx

        if (query && query.appId && state.tokenInfo.userId) {
            const res = await ctx.service.api.deleteByUserIdAndAppId(
                state.tokenInfo.userId,
                query.appId
            ).catch(e => {
                this.logger.error(e);
                response.sendFail(ctx);
            });

            if (res) {
                response.sendSuccess(ctx);
            } else {
                response.sendFail(ctx)
            }
        } else {
            response.sendFail(ctx, 'appId或userId为空')
        }
    }
}

module.exports = ApiController;
