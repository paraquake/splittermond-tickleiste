var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(7000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/package.json');
});

io.on('connection', function (socket) {

  socket.on('plsupdate', function (data) {
    //socket.emit('reloadRecords', { hello: 'world' });
  //  io.sockets.emit('reloadRecords', { it: 'works' });
    socket.broadcast.emit('reloadRecords', 'hello friends!');
  });
  socket.on('updatemodelonly', function (data) {
    //socket.emit('reloadRecords', { hello: 'world' });
  //  io.sockets.emit('reloadRecords', { it: 'works' });
    socket.broadcast.emit('reloadModel', 'hello friends!');
  });
});
