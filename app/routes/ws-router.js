const express = require('express')
const expressWS = require('express-ws')

let wsRouter = null
const WSRouter = (function() {
  function WSRouter(server) {
    this.server = null
    this.app = null
    this.clients = []
    this.server = server
    this.app = express()

    expressWS(this.app, this.server)
  }

  WSRouter.prototype.lintenClientConnect = function() {
    let me = this
    this.app.ws('/ws', function(ws, req) {
      console.log('client connect to server successful!')
      me.clients.push(ws)
      ws.on('message', function(msg) {
        console.log('receive client msg :', msg)
        me.receiveCmd(msg)
        me.sendCmd(msg, 1)
      })
      ws.on('close', function(msg) {
        console.log('client is closed')
        for (let i = 0; i < me.clients.length; i++) {
          if (me.clients[i] == this) {
            me.clients.splice(i, 1)
          }
        }
      })
    })
  }

  WSRouter.prototype.sendCmd = function() {
    for (let cell in this.clients) {
      this.clients[cell].send('Hello Reborn')
    }
  }

  WSRouter.prototype.receiveCmd = function(cmd) {
    console.log('接收消息: ', cmd)
  }

  return WSRouter
})()

function init(server) {
  if (wsRouter == null && server != null) {
    wsRouter = new WSRouter(server)
  }
  return wsRouter
}

function sendMsg(msg) {
  wsRouter.sendCmd(msg, '')
}

module.exports = {
  init: init,
  sendMsg: sendMsg
}
