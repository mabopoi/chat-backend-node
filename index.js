const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret', //add env variable
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);

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
