let username = prompt("Ingrese su nombre de usuario:");
let password = prompt("Ingrese su contrasena:");

function login(username, password) {
    let administrator = false;

    if (username == "admin" && password == "admin123"){
        adminsitrator = true;
    }
    return adminsitrator ? "puedes ingresar" : "No puedes ingresar";
};