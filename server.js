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
    
    // Escucha el evento de nueva notificación
    socket.on("nueva_notificacion", (data) => {
        console.log("Nueva notificación recibida:", data);

        // Reenvía la notificación a todos los clientes conectados
        io.emit("mostrar_notificacion", data);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

// Escuchar en el puerto 3000 (o el puerto asignado)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
