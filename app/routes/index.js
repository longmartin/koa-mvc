const router = require('koa-router')()
const home = require('../controller/home')

router.get('/', home.index)

router.post('/login', home.login)

router.post('/checklogin', home.checklogin)

module.exports = router
