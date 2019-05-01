/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2019-05-01 19:57:22
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-01 20:01:05
 */

'use strict';
const crypto = require('crypto');

module.exports = {
  cryptoByMd5(val) {
    const md5 = crypto.createHash('md5');
    return md5.update(val).digest('hex');
  },
};
