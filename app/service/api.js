/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-24 16:16:48
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-08 00:01:41
 */
'use strict';
const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

class ApiService extends Service {

    /**
     * 获取数据库操作对象
     *
     * @return {Session} 数据库操作对象
     * @memberof SessionService
     */
    getApiModel() {
        return this.ctx.model.Api;
    }


    /**
     * @description 通过userId查找Api配置
     * @param {*} userId
     * @memberof ApiService
     */
    async findByUserId(userId) {
        if (userId) {
            return this.getApiModel()
                .findOne({ userId });
        }

        return generateErrorPromise('userId 为空');
    }


    /**
     * @description 通过appId 和 域名与项目名查找
     * @param {*} appId
     * @returns
     * @memberof ApiService
     */
    async findByAppId(appId) {
        if (appId) {
            return this.getApiModel()
                .findOne({
                    appId
                });
        }

        return generateErrorPromise('appId 为空');
    }


    /**
    * 插入数据到数据库
    *
    * @param {*} apiObj apiObj对象
    * @return {Promise} 插入后的promise对象
    * @memberof UserService
    */
    async insert(apiObj) {

        if (apiObj) {
            return this.getApiModel()
                .findOneAndUpdate(
                    {
                        appId: apiObj.appId,
                        userId: apiObj.userId
                    },
                    apiObj,
                    {
                        upsert: true,
                    }
                );
        }

        return generateErrorPromise('apiObj 为空');
    }


    /**
     * @description 通过userId，appId删除数据
     * @param {*} userId
     * @param {*} appId
     * @returns
     * @memberof ApiService
     */
    async deleteByUserIdAndAppId(userId, appId) {
        if (userId && appId) {
            return this.getApiModel()
                .deleteOne({
                    userId,
                    appId
                });
        }

        return generateErrorPromise('userId或appId 为空');
    }
}

module.exports = ApiService;
