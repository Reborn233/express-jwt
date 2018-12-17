const jwt = require('jsonwebtoken')
const _ = require('lodash')
const config = require('../config')
const CODE = require('../tools/constant')
const mock = require('../tools/mock')

// 登录接口
module.exports = async (req, res, next) => {
  const { username, password } = req.body
  const $user = _.find(mock.users, o => o.username === username)
  if (!$user) {
    res.json({
      code: CODE.ERROR,
      message: '用户不存在'
    })
    return
  }
  if (!_.isEqual($user.password, password)) {
    res.json({
      code: CODE.ERROR,
      message: '密码不正确'
    })
    return
  }
  try {
    const userInfo = {
      username: $user.username,
      id: $user.id
    }
    // 生成token
    const token = jwt.sign(userInfo, config.secret, {
      expiresIn: config.expires
    })

    res.json({
      code: CODE.SUCCESS,
      token: token
    })
  } catch (error) {
    res.json({
      code: CODE.ERROR,
      message: 'token error'
    })
  }
}
