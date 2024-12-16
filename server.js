const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Configuración de CORS para permitir solo el dominio específico
const io = new Server(server, {
    cors: {
        origin: 'https://dev.hostcloudpe.lat', // Permite solo este dominio
        methods: ["GET", "POST"], // Métodos permitidos
        allowedHeaders: ["my-custom-header"], // Si usas headers personalizados
        credentials: true, // Permite el intercambio de credenciales (si es necesario)
    }
});

// Cuando un cliente se conecta
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    
    // Escuchar eventos del cliente
    socket.on('mensaje_cliente', (data) => {
        console.log('Mensaje recibido:', data);
    });

    // Enviar un mensaje al cliente
    socket.emit('mensaje_servidor', 'Bienvenido al servidor');
});

// Escuchar en el puerto 3000 (o el puerto asignado)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
