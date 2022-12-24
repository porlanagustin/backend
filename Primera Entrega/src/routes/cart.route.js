import e, { Router } from "express";
import upload from "../libs/multer.js";

const router = Router();

router.route('/').post((req,res) => {
    const cart = {
        items: [],
        id: null
    };

    cart.id = Math.random();

    const response = {
        status: 'created',
        data: cart,
    };  

    res.status(201).json(response);
});

router.route('/:id').delete((req,res) =>{

});

router.route('/:id/products').get((req,res) => {
    
}).post((req,res) => {
    
});

router.route('/:id/products/:id_prod').delete((req,res) => {
    res.send('delete ok')
});




export default router;