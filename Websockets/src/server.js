import express from 'express';
import { Server as IOServer } from 'socket.io';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app =  express();
const products = [];

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(3000, () => {
    console.log("Server 3000");
});

const io = new IOServer(expressServer);

io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);

    socket.emit("server:products", products)

    socket.on("client:product", productData => {
        products.push(productData);

        io.emit('server:products', products);
    });
});