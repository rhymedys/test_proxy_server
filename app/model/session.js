/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-24 15:09:05
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-01 19:46:22
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SessionSchema = new Schema({
    expires: {
      type: Number,
      required: true,
    },
    JSESSIONID: {
      type: String,
      required: true,
    },
    openId: {
      type: String,
      required: true,
      unique: true,
    },
  });

  return mongoose.model('t_session', SessionSchema);
};
