/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:35:34
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-03 09:38:38
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
        // const { ctx } = this;

        // const {
        //     body
        // } = ctx.request

        // let loginDataStr = JSON.stringify(body.loginData)
        
        // body.loginData = loginDataStr


        // await ctx.service.api.insert(
        //     body
        // )
        response.sendSuccess(ctx);
    }
}

module.exports = ApiController;
