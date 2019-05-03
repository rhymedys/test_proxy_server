/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 09:43:28
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-03 09:34:07
 */

'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const TokenSchema = new Schema({
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        appId: {
            type: String,
            required: true,
            unique: true,

        },
        loginData: {
            type: String,
            required: true
        },
        loginPath: {
            type: String,
            required: true
        },
        loginMethod: {
            type: String,
            required: true
        },
        loginContentType: {
            type: String,
        },
        domainAndProjejectPath: {
            type: String,
            required: true,
            unique: true,
        },
        auth: {
            type: String,
        }
    });

    return mongoose.model('t_api', TokenSchema);
};
