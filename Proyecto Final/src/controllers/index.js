import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sendMail from "../contact/nodemail.js";
import sendSms from "../contact/twilio.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getLoginMail = (req, res) => {

    if (req.isAuthenticated()) {
        const user = req.user;

        sendMail(
            user.username,
            user.firstname,
            user.lastname,
            user.email,
            user.phone,
            user.adress,
            user.age,
            user.photo,
        )

        sendSms(user.username, user.email)

        return res.render("login-ok", {
            usuario: user.username,
            nombre: user.firstname,
            apellido: user.lastname,
            email: user.email,
            phone: user.phone,
            adress: user.adress,
            age: user.age,
            photo: user.photo,
        });
    }

    res.sendFile(join(__dirname, "../views/login.html"));
};

const getLogin = (req, res) => {

    if (req.isAuthenticated()) {
        
        const user = req.user;

        return res.render("login-ok", {
            usuario: user.username,
            nombre: user.firstname,
            apellido: user.lastname,
            email: user.email
        });
    }

    res.sendFile(join(__dirname, "../views/login.html"));
};

const getRegister = (req, res) => {

    if (req.isAuthenticated()) {

        const user = req.session.user;
        const image = req.file.filename;
        res.locals.image = `${image}`;
        return res.render("login-ok", {
            usuario: user.username,
            nombre: user.firstname,
            apellido: user.lastname,
            email: user.email
        });
    }

    res.sendFile(join(__dirname, "../views/signup.html"));
};

const getLoginFailiure = (req, res) => {
    res.render("login-error");
};

const getRegisterFailiure = (req, res) => {
    res.render("signup-error");
};

const logOut = (req, res) => {
    req.logout(() => {
        return res.redirect("/login");
    });
};

export const authController = {
    getLogin,
    getRegister,
    getLoginFailiure,
    getRegisterFailiure,
    logOut,
    getLoginMail
};