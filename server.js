const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.get('/', (req, res) => {
 res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(socket.id+" Connected");
  socket.on('chat message', (msg) => {

     io.emit('chat message', msg);

  });
  socket.on('disconnect', () => {
   console.log(socket.id+'user disconnected');
 });
});
var port=process.env.PORT;
if(port== null || port=="")
{
  port="3001";
}
server.listen(port, () => {
  console.log('Server has started Successfully');
});
