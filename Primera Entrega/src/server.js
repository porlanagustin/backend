import express, { json, urlencoded } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import productsRouter from "./routes/products.route.js";
import cartRouter from "./routes/cart.route.js";
import loginHtml from "./routes/login.route.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use('/api/', loginHtml);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

app.use(json());
app.use(urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


app.listen(8080, () => {
    console.log("Server 8080 activo");
});