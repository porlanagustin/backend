import e, { Router } from "express";
import upload from "../libs/multer.js";
import fs from 'fs';

const router = Router();

//CART
let dataCart = fs.readFileSync("/home/agustin/programacion/CoderhouseBackend/Primera Entrega/src/data/cart.json");
const cart = JSON.parse(dataCart);

//PRODUCTS
let dataProducts = fs.readFileSync("/home/agustin/programacion/CoderhouseBackend/Primera Entrega/src/data/products.json");
const products = JSON.parse(dataProducts);

//ROUTES
router.route('/').post((req,res) => {

    let randomId = Math.floor(Math.random() * 101);
    let currentTime = new Date();
    const newCart = {id: randomId, timestamp: currentTime, products: []};

    try{
        fs.promises.writeFile("/home/agustin/programacion/CoderhouseBackend/Primera Entrega/src/data/cart.json", JSON.stringify(newCart))
    } catch (error){
        throw new Error(`Error al crear un carrito: ${error}`)
    }

    res.redirect('/');
    
});

router.route('/:id').delete((req,res) =>{

    const { id } = req.params;

    const cartNew = cart;

    for(let i = 0; i< cart.length; i++) {
        if(cart[i].id === Number(id)) {
            cartNew.splice(i, 1);
            break;
        };
    };

    try{
        fs.promises.writeFile("/home/agustin/programacion/CoderhouseBackend/Primera Entrega/src/data/cart.json", JSON.stringify(cartNew))
    } catch (error){
        throw new Error(`Error al crear un carrito: ${error}`)
    }

    const response = {
        action: "delete",
        "Item select": id,
        "New Cart": cartNew, 
    };

    res.status(201).json(response);
});


router.route('/:id/products').get((req,res) => {
    const { id } = req.params;
    const products = [];

    for(let i = 0; i< cart.length; i++) {
        if(cart[i].id === Number(id)) {
            products.push(cart[i].items);
        };
    };
    
    res.status(201).json({
        title: 'Productos elegidos',
        productos: products
    });


}).post((req,res) => {

    const { id } = req.params;
    const productSelect = [];
    const cartProduct = cart;

    for(let i = 0; i< products.length; i++){
        if(products[i].id === Number(id)){
            productSelect.push(products[i]); 
        };
    };

    cartProduct.products.push(productSelect);

    try{
        fs.promises.writeFile("/home/agustin/programacion/CoderhouseBackend/Primera Entrega/src/data/cart.json", JSON.stringify(cartProduct));
    } catch (error){
        throw new Error(`Error al crear un carrito: ${error}`)
    }

    res.status(201).json({
        title: 'Producto agregado',
        productos: productSelect
    });

});


router.route('/:id/products/:id_prod').delete((req,res) => {
    const { id } = req.params;
    const { id_prod } = req.params;

    cart.forEach(obj => {
        if(obj.id === Number(id)){
            obj.items = obj.items.filter(item => item.id !== Number(id_prod));
        };
    });
    
    res.status(201).json({
        title: 'Producto eliminado',
        carrito: cart
    });
});



//EXPORT
export default router;