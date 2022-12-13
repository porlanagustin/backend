const socket = io();

const poolProducts = document.getElementById("poolProducts");
const productForm = document.getElementById("productForm");
const nameProduct = document.getElementById("nameProduct");
const priceProduct = document.getElementById("priceProduct");
const imageProduct = document.getElementById("imageProduct");

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