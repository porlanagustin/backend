import compression from "compression";
import { Router } from "express";
import passport from "passport";
import { authController } from "../controllers/index.js";
import generateFaker from "../faker.js";
import logger from "../lib/logger.js";
import { Carts } from "../table/car.model.js";
import { Product } from "../table/product.model.js";

const router = Router();

// LOGIN
router
  .route("/login")
  
  .get(authController.getLogin)
  
  .post(
    passport.authenticate("login", { failureRedirect: "/fail-login" }),
    authController.getLogin
  );


  // REGISTER
router.route("/register")
  
.get(authController.getRegister)

.post(
    passport.authenticate("register", { failureRedirect: "/fail-register" }),
    authController.getLoginMail
  );



  
// FAIL LOGIN  
router.get("/fail-login", authController.getLoginFailiure);

// FAIL REGISTER
router.get("/fail-register", authController.getRegisterFailiure);

// LOGOUT
router.get("/logout", authController.logOut);

//
router.get("/login/adminproductos", (req, res) => {

  try {
    const { user } = req.session.passport;
    console.log(user.photo);
    if (!user) {
      return res.redirect("/login");
    }
    res.render("form",  { user });
  } catch (err) {
    logger.error(err);
  }
});

//
router.route("/login/products")

  .get(async (req, res) => {
    try {
      const { user } = req.session.passport;
      const userCart = await Carts.findOne({ username: user.username });
      const products = await Product.find();
      if (!user) {
        return res.redirect("/login");
      }
      res.render("cart", { cart: userCart, products: products, user });
    } catch (err) {
      logger.error(err);
    }
  })

  .post((req, res) => {
    try {
      const { productTitle } = req.body;
      console.log(productTitle);
    } catch (err) {
      logger.error(err);
    }
  });

router.put("/cart/:productId", async (req, res) => {
  try {

    const { productId } = req.params;

    const product = await Product.findById(productId);

    const cart = await Carts.findOne({
      username: req.session.passport.user.username,
    });

    cart.products.push(product);

    await Carts.updateOne(
      { username: req.session.passport.user.username },
      cart
    );

    res.sendStatus(200);

  } catch (err) {
    console.log(err);
    logger.error({ error: err }, "Error adding product");

    res.sendStatus(500);
  }
});

//
router.get("/info", compression(), authController.info);

//
router.get("/info-uncomp", authController.info);

//
router.get("/api/random", authController.getRandom);

export default router;