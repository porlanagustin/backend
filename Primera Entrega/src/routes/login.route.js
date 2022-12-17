import { Router } from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.route('/').post((req,res) => {
    res.send('post ok');
}).delete((req,res) => {
    res.send('delete ok');
}).get((req,res) => {
    res.render('login.ejs');
}).post((req,res) => {
    res.send('post ok');
}).delete((req,res) => {
    res.send('delete ok');
});


export default router;