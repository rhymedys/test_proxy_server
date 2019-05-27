/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:35:34
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-05-27 20:44:26
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../../extend/response');
class ProxyController extends Controller {

    async get() {
        const {
            ctx,
        } = this;

        const {
            url
        } = ctx.request;

        // console.log(ctx.request)

        const urlArray = url.replace('/test-proxy/proxy/', '').split('/')


        if (urlArray.length > 1) {

            const checkDomainAndPathInApiConfigRes = await this.checkDomainAndPathInApiConfig(
                urlArray[0],
            )

            if (checkDomainAndPathInApiConfigRes) {
                const {
                    domainAndProjejectPath,
                    loginPath,
                    loginMethod,
                    loginData,
                    loginContentType
                } = checkDomainAndPathInApiConfigRes

                let {
                    auth,
                    cookie
                } = checkDomainAndPathInApiConfigRes


                const fetch = async () => {
                    if (!auth && !cookie) {
                        auth = await this.login({
                            appId: urlArray[0],
                            loginPath,
                            loginMethod,
                            loginData,
                            loginContentType
                        })
                        await fetch()
                    } else {
                        const wholeUrl = urlArray.slice(1).join('/')

                        const Cookie = cookie || `JSESSIONID=${auth}`

                        const apiRes = await ctx.curl(
                            `https://${domainAndProjejectPath}/${wholeUrl}`,
                            {
                                headers: {
                                    Cookie
                                },
                                method: 'GET',
                                dataType: 'json',
                            }
                        )

                        if (apiRes.status !== 400) {
                            if (apiRes.data && apiRes.data.resultCode !== 410001) {
                                response.snedOther(ctx, apiRes.data)
                            } else if (cookie) {
                                response.sendFail(ctx, '当前使用手动cookie登录,cookie无效请清空或重置')
                            } else if (fetch.retryCount <= 6) {
                                fetch.retryCount += 1
                                auth = undefined
                                await fetch()
                            } else {
                                response.sendFail(ctx, `该接口请求错误，状态码：${apiRes.status}`)
                            }
                        } else {
                            response.sendFail(ctx, '该接口不存在')
                        }

                    }
                }
                fetch.retryCount = 0

                await fetch()

            } else {
                response.sendFail(ctx, '请求路径，配置有误')
            }
        } else {
            response.sendFail(ctx, '请求路径有误')
        }



    }

    async post() {
        const {
            ctx,
        } = this;

        const {
            url,
            body,
            header,

        } = ctx.request;

        const urlArray = url.replace('/test-proxy/proxy/', '').split('/')


        if (urlArray.length > 1) {

            const checkDomainAndPathInApiConfigRes = await this.checkDomainAndPathInApiConfig(
                urlArray[0],
            )

            if (checkDomainAndPathInApiConfigRes) {
                const {
                    domainAndProjejectPath,
                    loginPath,
                    loginMethod,
                    loginData,
                    loginContentType
                } = checkDomainAndPathInApiConfigRes

                let {
                    auth,
                    cookie
                } = checkDomainAndPathInApiConfigRes


                const fetch = async () => {
                    if (!auth && !cookie) {
                        auth = await this.login({
                            appId: urlArray[0],
                            loginPath,
                            loginMethod,
                            loginData,
                            loginContentType
                        })
                        await fetch()
                    } else {
                        const wholeUrl = urlArray.slice(1).join('/')

                        const contentType = header['content-type'] && header['content-type'].indexOf('application/json') > -1 ? 'json' : undefined

                        const Cookie = cookie || `JSESSIONID=${auth}`

                        const apiRes = await ctx.curl(
                            `https://${domainAndProjejectPath}/${wholeUrl}`, {
                                headers: {
                                    Cookie
                                },
                                contentType,
                                method: 'POST',
                                dataType: 'json',
                                data: body
                            }
                        )

                        if (apiRes.status !== 400) {
                            if (apiRes.data && apiRes.data.resultCode !== 410001) {
                                response.snedOther(ctx, apiRes.data)
                            } else if (cookie) {
                                response.sendFail(ctx, '当前使用手动cookie登录,cookie无效请清空或重置')
                            } else if (fetch.retryCount <= 6) {
                                fetch.retryCount += 1
                                auth = undefined
                                await fetch()
                            } else {
                                response.sendFail(ctx, `该接口请求错误，状态码：${apiRes.status}`)
                            }
                        } else {
                            response.sendFail(ctx, '该接口不存在')
                        }

                    }
                }
                fetch.retryCount = 0

                await fetch()

            } else {
                response.sendFail(ctx, '请求路径，配置有误')
            }
        } else {
            response.sendFail(ctx, '请求路径有误')
        }
    }


    /**
     * @description 登录
     * @param {*} appId
     * @param {*} loginPath
     * @param {*} loginMethod
     * @param {*} loginData
     * @returns
     * @memberof ProxyController
     */
    async login({
        appId,
        loginPath,
        loginMethod,
        loginData,
        loginContentType
    }) {
        const {
            ctx
        } = this

        // console.log(loginData)

        const loginRes = await ctx.curl(
            loginPath,
            {
                method: loginMethod,
                dataType: 'json',
                contentType: loginContentType,
                data: JSON.parse(loginData)
            }
        )

        // console.log(loginRes)

        const {
            data
        } = loginRes
        if (Object.prototype.toString.call(data) === '[object Object]') {

            if (data.resultCode === 0 && loginRes.headers['set-cookie'] && loginRes.headers['set-cookie'][0]) {
                const JSESSIONIDReg = new RegExp(/^JSESSIONID=.*?\;/)
                let match = loginRes.headers['set-cookie'][0].match(JSESSIONIDReg)
                if (match) {
                    match = match[0].replace('JSESSIONID=', '').replace(';', '')

                    await ctx.service.api.insert({
                        appId,
                        auth: match,
                        cookie: ''
                    })

                    return match
                }
            } else {
                response.send(ctx, data, data.resultCode, data.resultDesc)
            }
        } else {
            response.sendFail(ctx, '登录失败')
        }
    }



    /**
     * @description 查配置
     * @param {*} appId
     * @returns
     * @memberof ProxyController
     */
    async checkDomainAndPathInApiConfig(appId) {
        const {
            ctx
        } = this

        let res
        if (!appId) {
            res = false
        } else {
            res = await ctx.service.api.findByAppId(appId)
        }


        return res
    }

}

module.exports = ProxyController;
