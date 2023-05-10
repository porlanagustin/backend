import express, { Request, Response } from "npm:express";
import {
  bgBrightMagenta,
  bgGreen,
  bgRed,
  bgYellow,
  blue,
  bold,
  gray,
  italic,
  red,
  white,
} from "https://deno.land/std/fmt/colors.ts";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const colors: string[] = [];
const validColors = [
  bgBrightMagenta,
  bgGreen,
  bgRed,
  bgYellow,
  blue,
  bold,
  gray,
  italic,
  red,
  white,
];

// Ruta para mostrar el formulario y la lista de colores
app.get("/", (req: Request, res: Response) => {
  const form = `
    <form method="POST" action="/">
      <label for="color">Ingrese un color:</label>
      <input type="text" id="color" name="color">
      <button type="submit">Agregar</button>
    </form>
  `;

  const list = `
    <ul>
      ${colors
        .map(
          (color) =>
            `<li style="background-color: black; color: ${validColors.find(
              (validColor) => validColor.name === color
            )}">${color}</li>`
        )
        .join("")}
    </ul>
  `;

  res.send(`${form}${list}`);
});

// Ruta para procesar el formulario
app.post("/", (req: Request, res: Response) => {
  const color = req.body.color;
  colors.push(color);
  res.send(`Color ${color} agregado.`);
});

app.listen(3000, () => {
  console.log("Server listening port 3000");
});