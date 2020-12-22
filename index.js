const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

app.get('/', (req, res) => {
  res.json({ test: "It's working" });
});

io.on('connection', (socket) => {
  io.emit('connection', 'Someone has connected to the chat');
  socket.on('chat msg', (msg) => {
    io.emit('chat msg', msg);
  });
  socket.on('disconnection', () => {
    io.emit('disconnection', 'Someone has left the chat');
  });
});

http.listen(3000, () => console.log('Server working'));
