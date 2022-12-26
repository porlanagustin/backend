import express, { json, urlencoded } from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import path from "path";
import { engine } from "express-handlebars";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.engine('hbs', engine({
    
}))


app.use(json());
app.use(urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname + "/views"));

app.use("/", routes);

app.listen(3000, () => {
    console.log("Server listening port 3000");
});