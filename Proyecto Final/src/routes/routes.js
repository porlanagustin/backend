import { Router } from "express";
import passport from "passport";
import { authController } from "../controllers/index.js";
import logger from "../lib/logger.js";
import { Carts } from "../table/cart.model.js";
import { Product } from "../table/product.model.js";
import sendBuyData from "../contact/buyInfoEmail.js";
import sendInfoSms from "../contact/buyInfoSms.js";
import CartManagerMongo from '../crud/cart.mongo.js';
import ProductManagerMongo from '../crud/products.mongo.js';
import { middlewares } from "../middleware/middlewares.js";

const router = Router();

const cartManager = new CartManagerMongo(Carts);
const productManager = new ProductManagerMongo(Product)

router.route("/login")
.get(authController.getLogin)
.post(passport.authenticate("login", { failureRedirect: "/fail-login" }),authController.getLogin
);

router.route("/register")
.get(authController.getRegister)
.post(passport.authenticate("register", { failureRedirect: "/fail-register" }),authController.getLoginMail
);
 
router.get("/fail-login", authController.getLoginFailiure);

router.get("/fail-register", authController.getRegisterFailiure);

router.get("/logout", authController.logOut);

router.get("/login/products", middlewares.requireAuth, async (req, res) => {
  try {
    const user = req.session.passport.user;
    const products = await productManager.getProducts();

    if (!user) {
      return res.redirect("/login");
    }

    res.render("inicio-ok", { user, products });
  } catch (err) {
    const errorMsg = "Error al obtener los productos";
    logger.error({ message: errorMsg, error: err });
    res.status(500).send(errorMsg);
  }
});

router.route("/cart")
  .post( async (req, res) => {
    try {
      const { title, price, productId } = req.body;
      const { user } = req.session.passport;
      const products = await productManager.getProducts();
      const product = { title, price, productId };

      await cartManager.addToCart(user.username, product);

      const cartFinded = await cartManager.findOneCart(user.username);

      if (!cartFinded){
        return res.status(404).send("No se encontró un carrito para el usuario.");
      }
        
      res.render("show-cart", { user, products, cartFinded });
    } catch (err) {
      logger.error(err);
      res.status(500).send("Error al agregar el producto al carrito.");
    }
  });

router.route('/buyProducts')

 .post( async (req, res) => {
  const { username, email } = req.body;
  const { user } = req.session.passport;
  const cart = await Carts.findOne({ username: username});
  const products = cart.products;

  sendBuyData(products, username, email)
  sendInfoSms(products, email)

  res.render("buy-success", { user, products })
})

router.post('/emptyCart', async (req, res) => {
  const { user } = req.session.passport;
  try {
    const cart = await Carts.findOne({ username: user.username });
    const { _id } = cart;
    await Carts.findByIdAndUpdate(_id, { products: [] });

    res.render("empty-cart")
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al vaciar el carrito');
  }
});

export default router;