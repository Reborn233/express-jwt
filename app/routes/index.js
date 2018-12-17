const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const ROOT = '/api'

const controllers = require('../controllers')

// 登录接口
router.post(ROOT + '/login', controllers.login)
// 需要登录才能请求的接口
router.get(ROOT + '/testAuth', auth, controllers.testAuth)

// 开放型接口
router.get(ROOT + '/test', controllers.test)

module.exports = router
