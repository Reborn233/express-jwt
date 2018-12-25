const jwt = require('jsonwebtoken')
const config = require('../config')
const debug = require('debug')('api:server')
module.exports = {
  verifyToken: token => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          debug('校验token失败')
          reject(err)
        } else {
          debug('token 验证成功')
          resolve(decoded)
        }
      })
    })
  }
}
