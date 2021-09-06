const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {addUser, getUser} = require('./users.js');

const cors = require('cors');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('join', ({name}, callback) => {
    const {error, user} = addUser({id: socket.id, name});

    if (error) return callback(error);

    socket.emit('message', {user: 'admin', text: `Welcome, ${user.name}`});
    socket.broadcast.to().emit('message', {user: 'admin', text: `${user.name}, has joined`});

    socket.join();

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to().emit('message', {user: user.name, text: message});

    callback();
  });

  //   socket.on('disconnect', () => {
  //     const user = removeUser(socket.id);
  //   });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
