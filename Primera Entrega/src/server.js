import express, { json, urlencoded } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import productsRouter from "./routes/products.route.js";
import baseRouter from "./routes/base.route.js";
import path from 'path';


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use('/api/products', productsRouter);
app.use('/', baseRouter);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname + "/uploads")));

app.listen(8080, (error) => {
    if (error) {
        console.log("Error al iniciar la app", error);
    } else {
    console.log("Server 8080 activo");
}
});