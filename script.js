// NUMERO DE WHATSAPP
const telefono = "50688888888"; // cambia por tu numero

// BOTONES PEDIR
const botones = document.querySelectorAll(".pedirBtn");

botones.forEach(btn => {

btn.addEventListener("click", () => {

const producto = btn.dataset.producto;

const mensaje = `Hola, me interesa el producto: ${producto}`;

const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

window.open(url, "_blank");

});

});


// ANIMACION PRODUCTOS

const productos = document.querySelectorAll(".product");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.style.opacity = 1;
entry.target.style.transform = "translateY(0)";

}

});

});

productos.forEach(product => {

product.style.opacity = 0;
product.style.transform = "translateY(40px)";
product.style.transition = "0.6s";

observer.observe(product);

});


// BUSCADOR DE PRODUCTOS

const buscador = document.createElement("input");

buscador.placeholder = "Buscar producto...";
buscador.classList.add("buscador");

document.body.prepend(buscador);

buscador.addEventListener("keyup", () => {

const texto = buscador.value.toLowerCase();

productos.forEach(p => {

const nombre = p.innerText.toLowerCase();

if(nombre.includes(texto)){

p.style.display = "block";

}else{

p.style.display = "none";

}

});

});