const express = require('express')
const expressWS = require('express-ws')
const debug = require('debug')('node-server:server')

let wsRouter = null
const WSRouter = (function() {
  function WSRouter(server) {
    this.server = null
    this.app = null
    this.wsInstance = null
    this.clients = []
    this.server = server
    this.app = express()

    this.wsInstance = expressWS(this.app, this.server)
  }

  WSRouter.prototype.lintenClientConnect = function() {
    let me = this
    this.app.ws('/ws', function(ws, req) {
      debug('client connect to server successful!')
      me.clients.push(ws)
      ws.on('message', function(msg) {
        debug('receive client msg :', msg)
        if (msg === 'HeartBeat') return
        me.receiveCmd(msg)
        me.sendCmd(msg, 1)
      })
      ws.on('close', function(msg) {
        debug('client is closed')
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
    debug('接收消息: ', cmd)
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
