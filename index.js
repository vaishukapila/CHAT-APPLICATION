const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    socket.to(room).emit('chatMessage', {
      username: 'System',
      message: `${username} joined the room`,
      time: new Date().toLocaleTimeString()
    });

    socket.on('chatMessage', (msg) => {
      io.to(room).emit('chatMessage', {
        username,
        message: msg,
        time: new Date().toLocaleTimeString()
      });
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
