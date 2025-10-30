const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Servir archivos de la carpeta actual
app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('🟢 Usuario conectado');

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Usuario desconectado');
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
