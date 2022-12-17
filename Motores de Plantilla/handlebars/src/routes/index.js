import { Router } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const products = [];

router.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../views/productForm.html"));
});

router.post("/product", (req, res) => {
  const { name, price, thumbnail } = req.body;

  products.push({ name, price, thumbnail });

  res.redirect("/");
});

router.get("/product", (req, res) => {
  res.render("products.html", { products });
});

export default router;