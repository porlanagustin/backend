import express from 'express';
import { Server as IOServer } from 'socket.io';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import Contenedor from './api.js'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app =  express();


app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(3000, () => {
    console.log("Server 3000");
});

const io = new IOServer(expressServer);

const productApi = new Contenedor(
    {
    client: 'mysql',
    connection: { 
        host: "127.0.0.1",
        user: "cucho",
        password: "clear1",
        database: "backend"
    },
    pool: { min: 0, max: 7 },
},
    "product"
);

const messageApi = new Contenedor(
    {
    client: "sqlite3",
    connection: {
        filename: path.resolve(__dirname, "./database/backend.sqlite"),
    },
    useNullAsDefault: true,
    },
    "message"
);

io.on('connection', async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);

    socket.emit("server:products", await messageApi.getAll());
    socket.emit("server:messages", await productApi.getAll());

    socket.on("client:product", async (productData) => {
        await productApi.saveProduct({
            name: productData.name,
            price: Number(productData.price),
            image: productData.image,
        });

        io.emit('server:products', await productApi.getAll());
    });

    socket.on("client:message", async (messageData) => {
        await messageApi.saveImage({ email: messageData.email, message: messageData.message, time: Date.now()});

        io.emit("server:messages", await messageApi.getAll());
    })
});


app.on("error", (err) =>{
    console.log(err);
});