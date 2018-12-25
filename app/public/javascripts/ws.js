if ('WebSocket' in window) {
  var ws = new WebSocket('ws://localhost:3000/ws')
} else {
  alert('不支持 WebSocket')
}
var $log = $('#log')
var $btn = $('button')
var $input = $('input')
function log(n) {
  n = '$ ' + n
  var msg = $log.text()
  if (msg) {
    $log.text(msg + '\n' + n)
  } else {
    $log.text(n)
  }
  toBottom($('#log'))
}
function toBottom(obj) {
  obj.scrollTop(obj.prop('scrollHeight'), obj.height())
}
var heartCheck = {
  timeout: 60000,
  timeoutObj: null,
  reset: function() {
    clearTimeout(this.timeoutObj)
    this.start()
  },
  start: function() {
    this.timeoutObj = setTimeout(function() {
      ws.send('HeartBeat')
    }, this.timeout)
  }
}

ws.onopen = function(msg) {
  heartCheck.start()
  log('ws 已打开', msg)
}

ws.onmessage = function(evt) {
  heartCheck.reset()
  var msg = evt.data
  log('接收msg: ' + msg)
}

ws.onclose = function() {
  log('ws 已关闭')
}

ws.onerror = function(err) {
  log('ws error')
}

$btn.on('click', function(e) {
  var msg = $input.val()
  if (!msg) return false
  log('发送msg: ' + msg)
  ws.send(msg)
})
