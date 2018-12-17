const tools = require('../tools')
const CODE = require('../tools/constant')
module.exports = async (req, res, next) => {
  const token = req.headers && req.headers['access-token']
  if (token) {
    try {
      const result = await tools.verifyToken(token)
      res.$user = result
      next()
    } catch (error) {
      res.json({
        code: CODE.ERROR,
        message: error
      })
    }
  } else {
    res.status(401).json({
      code: CODE.ERROR,
      message: '没有权限'
    })
  }
}
