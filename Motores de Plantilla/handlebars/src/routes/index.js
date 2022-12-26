import { Router } from "express";
import upload from "../libs/multer.js";

const router = Router();
const products = [];

router.get('/', (req, res) => {
    res.render('main');
})

router.get("/product", (req, res) => {
    console.log("funciona el get");
    res.render("product", { products, hasAny: true });
});

router.post('/product', (req, res) => {
    console.log("funciona el post");
    
    //const { name, price, image } = req.body;

    products.push({ name: 'agus', price: 11, image: 'no hay'});

    res.redirect("/");
});

export default router;