import { Router } from "express";

const router = Router();
const products = [];

router.get("/", (req, res) => {
  res.render("datos.pug", { 
    showProduct: "Ver productos",
    loadProduct: "Cargar un producto",
    styleForm: "width: 450px; margin: auto; padding: 20px; border: 1px solid #ccc;",
    loadStyle: "background-color: #4CAF50; color: white; padding: 12px 20px; border: none; cursor: pointer;",  
    styleContainer: ""
  });
});

router.post("/product", (req, res) => {
  const { name, price, thumbnail } = req.body;

  products.push({ name, price, thumbnail });

  res.redirect("/");
});

router.get("/product", (req, res) => {
  res.render("products.pug");
});

export default router;