const express = require('express')
const router = express.Router()
const app = express()
require('express-ws')(app)
// websocket
router.ws('/websocket', function(ws, req) {
  ws.on('message', function (msg) {
    console.log('message: ', msg)
    ws.send(msg)
  })

  setTimeout(function() {
    ws.send('2秒后 消息推送')
  }, 2000)
})

module.exports = router
