/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-16 16:41:41
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-17 21:41:43
 */
'use strict';

const Controller = require('egg').Controller;

class RenderController extends Controller {
  async renderAdmin() {
    await this.ctx.render('index.ejs');
  }

  async renderTestDemo() {
    await this.ctx.render('test.ejs');
  }
}

module.exports = RenderController;
