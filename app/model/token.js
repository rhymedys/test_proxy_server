/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 09:43:28
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-07 23:28:12
 */

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TokenSchema = new Schema({
    expires: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
  });

  return mongoose.model('t_token', TokenSchema);
};
