const CODE = require('../tools/constant')

// 测试接口
module.exports = async (req, res, next) => {
  res.json({
    code: CODE.SUCCESS,
    data: req.query,
    message: '测试 api 不需要登录'
  })
}
