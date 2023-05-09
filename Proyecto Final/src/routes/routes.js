import { Router } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import passport from "passport";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

// LOGIN
router.route("/").get( (req, res) => {
    res.sendFile(join(__dirname, "../views/login.html"))
})
.post(passport.authenticate("login", { failureRedirect: "/fail-login" }), (req, res) => {

    if (req.isAuthenticated()) {
        const user = req.user;
        return res.render("login-ok", {
          nombre: user.firstname,
            apellido: user.lastname,
            email: user.email
        });
      }
})

// REGISTER
router.route("/register")
.get((req, res) => {
    res.sendFile(join(__dirname, "../views/signup.html"))
})
.post((req, res) => {

})

// NOT LOGIN
router.get("/not-login", (req, res) => {
    res.render("not-login");
  });

export default router;