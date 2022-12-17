import express, { Router } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const router = Router();



router.route('/api/productos').get((req,res) => {

}).post((req,res) => {

}).delete((req,res) => {

});


router.route('/api/carrito').post((req,res) => {

}).delete((req,res) => {

}).get((req,res) => {

}).post((req,res) => {

}).delete((req,res) => {

});



app.listen(8080, () => {
    console.log("Server 8080 activo");
});