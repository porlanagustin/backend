const socket = io();


// PRODUCTOS
const poolProducts = document.getElementById("poolProducts");
const productForm = document.getElementById("productForm");
const nameProduct = document.getElementById("nameProduct");
const priceProduct = document.getElementById("priceProduct");
const imageProduct = document.getElementById("imageProduct");
//CHAT
const messagesPool = document.getElementById("messagesPool");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");
const messageForm = document.getElementById("messageForm");

// LOGICA PRODUCTOS
productForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const name = nameProduct.value;
    const price = priceProduct.value;
    const image = imageProduct.value;

    socket.emit('client:product', {name, price, image});
});

socket.on("server:products", products => {

    poolProducts.innerHTML = "";

    products.forEach(product => {
        poolProducts.innerHTML += `
            <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img src="${product.image}" style="height="50px", width="50px" "></img></td>
            </tr>`;
    });
});

//LOGICA CHAT
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const message = messageInput.value;

    socket.emit('client:message', {email, message});

});

socket.on("server:messages", messages =>{
    messagesPool.innerHTML = "";

    messages.forEach(message =>{
        messagesPool.innerHTML += `
        <tr>
        <td>${message.email}</td>
        <td>${message.message}</td>
        <td>${message.time}</td>
        </tr>`;
    });
});

