import e, { Router } from "express";
import upload from "../libs/multer.js";

const router = Router();

const cart = [{
    id: 1,
    items: [{
        name: "bondiola",
        id: 1
    },
{
    name: "cremoso",
    id: 2 
}]
},
{
    id: 2,
    items: [{
        name: "salame",
        id: 3
    },
{
    name: "jamon",
    id: 4 
}]
},
{
    id: 3,
    items: [{
        name: "jamon serrano",
        id: 5
    },
{
    name: "provolone",
    id: 6
}]
}];

router.route('/').post((req,res) => {

    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
    
        return Math.floor(Math.random() * (max - min)) + min;
    };

    let id = getRandom(0, 101);

    cart.push({
        items: [],
        id: id
    });

    const response = {
        Carts: cart,
    };  

    res.status(201).json(response);
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




export default router;