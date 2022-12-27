import e, { Router } from "express";
import upload from "../libs/multer.js";
import fs from 'fs';

const router = Router();

//PRODUCTS
let dataProducts = fs.readFileSync("/home/agustin/programacion/CoderhouseBackend/Primera Entrega/src/data/products.json");
const products = JSON.parse(dataProducts);


//MIDLEWARE
const checkIfAdminMiddleware = (req, res, next) => {
    const userType = req.header("userType");

    if (userType === "ADMIN") {
    next();
    } else {
    res.status(401).json({
        status: "Sin autorizacion",
        data: null,
    });
    }
};


//ROUTES
router.route('/').get((req,res) => {
    res.json(products);
}).post(upload.any(), (req,res) => {

    const { nameProduct, priceProduct  } = req.body;

    const newProductId = products[products.length -1].id + 1;

    const newProduct = {
        id: newProductId, 
        name: nameProduct, 
        price: priceProduct,};
        
    const response = {
        status: 'created',
        data: newProduct,
    };    

    products.push(newProduct);

    res.status(201).json(response);

});

router.route('/:id').get((req,res) => {

    const { id } = req.params;
    const productSelect = products.find((product) => product.id === Number(id));

    if(!productSelect){
        return res.status(404).json({ status: "Not found"});
    }

    res.json(productSelect);
}).put(checkIfAdminMiddleware, (req,res) => {

    const { id } = req.params;

    const { name, price } = req.body;

    const indexProdToUpdate = products.find((product) => product.id === Number(id));

    if(!indexProdToUpdate){
        req.status(404).json({status: "No encontrado", data: null});
    }

    products.splice(indexProdToUpdate, 1, { id, name, price});

    res.status(200).json({
        status: "Updated",
        data: { id, name, price},
    });

}).delete(checkIfAdminMiddleware, (req,res) => {
    const { id } = req.params;
    const indexProductToDelete = products.findIndex((product) => product.id === Number(id));
    const productToDelete = products[indexProductToDelete];

    if (!productToDelete) {
        return res.status(404).json({ status: "Not found", data: null });
    };

    products.splice(indexProductToDelete, 1);

    res.status(404).json({
        status: "Delete",
        data: productToDelete,
    });
});

//EXPORT
export default router;





