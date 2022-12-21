import e, { Router } from "express";
import upload from "../libs/multer.js";

const router = Router();

const products = [{
    id: 1,
    name: 'diamante'
},
{
    id: 2,
    name: 'oro'
}];

router.route('/:id').get((req,res) => {

    const { id } = req.params;
    const productSelect = products.find((product) => product.id === Number(id));

    if(!productSelect){
        return res.status(404).json({ status: "Not found"});
    }

    res.json(productSelect);
});

router.route('/').get((req,res) => {
    res.json(products);
}).post((req,res) => {
    res.send('post ok');
}).delete((req,res) => {
    res.send('delete ok');
});

export default router;





