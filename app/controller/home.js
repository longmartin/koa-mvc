const crypto = require('crypto');

var homeController = {
  async index(ctx, next) {
    ctx.body = 'Hello Koa!';
  },
  
  async login(ctx, next) {
    var postDt = ctx.request.body
    const username = "admin"
    const password = "123456"
    const app_secret = "123456"
    if(postDt.username != username) {
      ctx.body = {
        code: 1,
        data: {
            errMsg: "用户名不存在"
        }
      }
      return
    }
    if(postDt.password != password) {
      ctx.body = {
        code: 2,
        data: {
            errMsg: "密码错误"
        }
      }
      return
    }
    const hmac_password = crypto.createHmac('sha1', app_secret).update(password).digest("hex")
    ctx.body = {
      code: 0,
      data: {
        username: username,
        password: hmac_password
      }
    }
  },
  
  async checklogin(ctx, next) {
    var postDt = ctx.request.body
    const username = "admin"
    const password = "123456"
    const app_secret = "123456"
    const hmac_password = crypto.createHmac('sha1', app_secret).update(password).digest("hex")
    if(postDt.username != username) {
      ctx.body = {
        code: 1,
        data: {
            errMsg: "用户名不存在"
        }
      }
      return
    }
    if(postDt.password != hmac_password) {
      ctx.body = {
        code: 2,
        data: {
            errMsg: "密码错误"
        }
      }
      return
    }
    ctx.body = {
      code: 0,
      data: {}
    }
  },
}

module.exports = homeController