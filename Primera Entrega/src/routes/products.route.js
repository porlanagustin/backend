import { Router } from "express";

const router = Router();

router.route('/').get((req,res) => {
    res.send('get ok');
}).post((req,res) => {
    res.send('post ok');
}).delete((req,res) => {
    res.send('delete ok');
});

export default router;





