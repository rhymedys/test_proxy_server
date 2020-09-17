/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 09:43:28
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2020-09-17 15:16:31
 */

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const  WxrecommandSchema = new Schema({
    wx: {
      type: String,
      required: true,
    },
    dataId: {
      type: String,
      required: true,
      unique: true
    }
  });

  return mongoose.model('t_wxrecommand', WxrecommandSchema);
};
