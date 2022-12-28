import e, { Router } from "express";
import upload from "../libs/multer.js";
import fs from 'fs';
import { get } from "http";

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

    const listProduct = products;

    const { timestamp, nombre, descripcion, codigo, price} = req.body;

    let newProductId

    if(products.length == 0){
        newProductId = 1
    }else{
        newProductId = products[products.length -1].id + 1;
    }

    const newProduct = { id: newProductId, timestamp, nombre, descripcion, codigo, price};

    listProduct.push(newProduct);

    try{
        fs.promises.writeFile("/home/agustin/programacion/CoderhouseBackend/Primera Entrega/src/data/products.json", JSON.stringify(listProduct))
    } catch (error) {
        throw new Error(`Error al guardar un objeto nuevo: ${error}`)
    }
        

    res.status(201).json({
        title: "Objeto agregado",
        data: listProduct
    });

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

}).delete((req,res) => {

    const { id } = req.params;

    const newProducts = products.filter(item => item.id != Number(id));

    try{
        fs.promises.writeFile("/home/agustin/programacion/CoderhouseBackend/Primera Entrega/src/data/products.json", JSON.stringify(newProducts));
    }catch (error){
        res.send('No fue posible eliminar el producto');
    }

    res.json({
        title: "Producto eliminado",
        "Nuevo Listado": newProducts
    });

});

//EXPORT
export default router;






