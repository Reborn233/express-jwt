const CODE = require('../tools/constant')
const wsRouter = require('../routes/ws-router')
const debug = require('debug')('api:server')

// 测试接口
module.exports = async (req, res, next) => {
  const wsr = wsRouter.init()
  debug(wsr.clients)

  res.json({
    code: CODE.SUCCESS,
    data: req.query,
    // ws: wsInstance,
    message: '测试 api 不需要登录 '
  })
}
