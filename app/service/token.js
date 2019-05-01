/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 09:46:00
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-01 20:11:31
 */

'use strict';

const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;


class TokenService extends Service {

  /**
   * 获取数据库操作对象
   *
   * @return {Token} 数据库操作对象
   * @memberof TokenService
   */
  getTokenModel() {
    return this.ctx.model.Token;
  }


  /**
   * 插入token
   *
   * @param {*} tokenObj token对象
   * @return {Promise} 插入后后promise对象
   * @memberof TokenService
   */
  async insert(tokenObj) {
    if (tokenObj) {
      return this.getTokenModel()
        .findOneAndUpdate({
          userId: tokenObj.userId,
        }, tokenObj, {
          upsert: true,
        });
    }

    return generateErrorPromise('tokenObj为空');
  }


  /**
   * 通过用户Id查找用户token信息
   *
   * @param {*} userId 用户Id
   * @return  {Promise} 查找后promise对象
   * @memberof TokenService
   */
  async findByUserId(userId) {
    if (userId) {
      return this.getTokenModel()
        .findOne({
          userId: String(userId),
        });
    }

    return generateErrorPromise('userId 为空');
  }

  /**
   * 通过用户名查找token信息
   *
   * @param {*} userName 用户名
   * @return {Promise} 查找后promise对象
   * @memberof TokenService
   */
  async findByUserName(userName) {
    if (userName) {
      return this.getTokenModel()
        .findOne({
          userName,
        });
    }

    return generateErrorPromise('userName 为空');
  }


  /**
   *通过token查看Token信息
   *
   * @param {*} token token值
   * @return {Promise} 查找后promise对象
   * @memberof TokenService
   */
  async findByToken(token) {
    if (token) {
      return this.getTokenModel()
        .findOne({
          token,
        });
    }
    return generateErrorPromise('token 为空');
  }


  /**
   * 通过token删除Token信息
   *
   * @param {*} token token值
   * @return {Promise} 删除后Promise对象
   * @memberof TokenService
   */
  async deleteByToken(token) {
    if (token) {
      return this.getTokenModel()
        .deleteOne({
          token,
        });
    }

    return generateErrorPromise('token 为空');
  }


}
module.exports = TokenService;
