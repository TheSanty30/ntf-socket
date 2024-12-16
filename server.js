const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configura el puerto
const PORT = process.env.PORT || 3000;

// Configura el servidor de Express
app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Mi servidor de Socket.io está funcionando.');
});

// Configura el servidor de WebSockets (socket.io)
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Inicia el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
