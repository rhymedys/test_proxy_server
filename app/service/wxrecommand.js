/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:12:12
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2020-09-17 15:19:45
 */

'use strict';
const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

class WxrecommandService extends Service {


	/**
	 * 获取数据库操作对象
	 *
	 * @return {Session} 数据库操作对象
	 * @memberof SessionService
	 */
	getWxrecommandServiceModel() {
		return this.ctx.model.Wxrecommand;
	}

	/**
   * 插入数据到数据库
   *
   * @param {*} obj session对象
   * @return {Promise} 插入后的promise对象
   * @memberof UserService
   */
	async update(obj) {
		if (obj) {
			return this.getWxrecommandServiceModel()
				.findOneAndUpdate({ dataId: obj.dataId }, obj, { upsert: true });
		}
		return generateErrorPromise('obj 为空');
	}

	/**
	 * 通过userId 查找用户信息
	 *
	 * @param {*} dataId userId 唯一
	 * @return {Promise} 查找后Promise对象
	 * @memberof UserService
	 */
	async findByDataId(dataId) {
		if (dataId) {
			return this.getWxrecommandServiceModel()
				.findOne({
					dataId,
				});
		}

		return generateErrorPromise('dataId 为空');
	}
}

module.exports = WxrecommandService;
