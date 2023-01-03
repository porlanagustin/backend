import express, { urlencoded } from 'express';
import { Server as IOServer } from 'socket.io';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from "./routes/index.js";
import Contenedor from './api.js'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app =  express();

app.use(express.static(__dirname + "/views"));
app.use(urlencoded({ extended: true }));
app.use('/', router);

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
    console.log(`New client connected ${socket.id}`);

    socket.emit("server:product", await messageApi.getAll());
    socket.emit("server:message", await productApi.getAll());

    socket.on("client:message", async (messageInfo) => {
        await messageApi.save({ ...messageInfo, time: Date.now()});
        io.emit("server:message", await messageApi.getAll());
    });

    socket.on("client:product", async (product) =>{
        await productApi.save({
            title: product.nameProduct,
            price: Number(product.priceProduct),
        });
        io.emit("server:product", await productApi.getAll());
    });
});

app.on("error", (err) =>{
    console.log(err);
});

