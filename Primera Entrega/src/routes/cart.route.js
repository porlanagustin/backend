import e, { Router } from "express";
import upload from "../libs/multer.js";
import fs from 'fs';

const router = Router();

//CART
let dataCart = fs.readFileSync("/home/agustin/programacion/CoderhouseBackend/Primera Entrega/src/data/cart.json");
const cart = JSON.parse(dataCart);

//ROUTES
router.route('/').post((req,res) => {

    res.send('llega un carrito')

    // function getRandom(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min)) + min;
    // };
    // let id = getRandom(0, 101);
    // //id,timestamp,products
    // const response = {
    //     Carts: cart,
    // };  
    // res.status(201).json(response);
});

router.route('/:id').delete((req,res) =>{
    const { id } = req.params;

    for(let i = 0; i< cart.length; i++) {
        if(cart[i].id === Number(id)) {
            cart.splice(i, 1);
            break;
        };
    };

    const response = {
        action: "delete",
        cartNew: cart, 
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


}).post(upload.any(), (req,res) => {
    const { id } = req.params;
    const { items }   = req.body;

    cart.forEach(obj => {
        if(obj.id === Number(id)){
            obj.items.push(items);
    };
    });

    res.status(201).json({
        title: 'Carrito modificado',
        carrito: cart
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