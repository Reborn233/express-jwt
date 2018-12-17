const CODE = require('../tools/constant')

// 测试接口
module.exports = async (req, res, next) => {
  const $user = res.$user
  res.json({
    code: CODE.SUCCESS,
    data: $user,
    message:'测试 api 需要登录才能请求'
  })
}
