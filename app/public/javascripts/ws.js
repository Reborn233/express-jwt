if ('WebSocket' in window) {
  var ws = new WebSocket('ws://localhost:3000/ws/websocket')
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
}

ws.onopen = function (msg) {
  log('ws 已打开',msg)
}

ws.onmessage = function(evt) {
  var msg = evt.data
  console.log('msg: ', msg)
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

  ws.send(msg)
})
