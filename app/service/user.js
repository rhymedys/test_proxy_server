/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:12:12
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-01 20:11:21
 */

'use strict';
const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

class UserService extends Service {


  /**
   * 获取数据库操作对象
   *
   * @return {Session} 数据库操作对象
   * @memberof SessionService
   */
  getUserModel() {
    return this.ctx.model.User;
  }

  /**
 * 插入数据到数据库
 *
 * @param {*} userObj session对象
 * @return {Promise} 插入后的promise对象
 * @memberof UserService
 */
  async insert(userObj) {
    if (userObj) {
      return this.getUserModel()
        .findOneAndUpdate({ userId: userObj.userId }, userObj, { upsert: true });
    }
    return generateErrorPromise('userObj 为空');
  }

  /**
   * 通过userId 查找用户信息
   *
   * @param {*} userId userId 唯一
   * @return {Promise} 查找后Promise对象
   * @memberof UserService
   */
  async findByUserId(userId) {
    if (userId) {
      return this.getUserModel()
        .findOne({
          userId,
        });
    }

    return generateErrorPromise('userId 为空');
  }
}

module.exports = UserService;
