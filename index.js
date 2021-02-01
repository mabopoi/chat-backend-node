require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: process.env.ORIGIN,
  },
});

app.use(bodyParser.json());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
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

http.listen(process.env.PORT, () =>
  console.log(`Server working at port ${process.env.PORT}`)
);
