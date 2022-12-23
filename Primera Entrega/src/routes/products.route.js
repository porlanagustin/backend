import e, { Router } from "express";
import upload from "../libs/multer.js";

const router = Router();

const products = [{
    id: 1,
    name: 'diamante',
    price: 100
},
{
    id: 2,
    name: 'oro',
    price: 50
}];

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

}).delete(checkIfAdminMiddleware, (req,res) => {
    res.send('delete ok');
});




export default router;





