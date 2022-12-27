import express, { json, urlencoded } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import productsRouter from "./routes/products.route.js";
import baseRouter from "./routes/base.route.js";
import cartRouter from "./routes/cart.route.js";
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname + "/uploads")));

app.use((req, res, next) => {
    next()
});

app.use('/api/cart', cartRouter);
app.use('/api/products', productsRouter);
app.use('/', baseRouter);

app.listen(8080, (error) => {
    if (error) {
        console.log("Error al iniciar la app", error);
    } else {
    console.log("Server 8080 activo");
}
});