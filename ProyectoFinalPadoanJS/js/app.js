const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const tarjetaForm = document.getElementById("tarjetaForm");

let carrito = JSON.parse(localStorage.getItem("carrito")) || []; 

const getProductos = async() => {
  const response = await fetch("data.json");
  const data = await response.json();

  data.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class="price">${product.precio} $</p>
    `;
  
    shopContent.append(content);
  
    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";
  
    content.append(comprar);
  
    comprar.addEventListener("click", () => {
      const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
  
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });
        carritoCounter();
        saveLocal();
        pintarCarrito();
      };
    });
  });
};

getProductos();

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

tarjetaForm.addEventListener("submit", (event) => {
  event.preventDefault();
  eliminarProductosDelCarrito();
  document.getElementById("vent").style.display = "none";
  modalContainer.style.display = "none";
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'La compra fue realizada con exito',
    showConfirmButton: false,
    timer: 1500
  });
  tarjetaForm.reset();
});

function eliminarProductosDelCarrito() {
  carrito = [];
  pintarCarrito();
  carritoCounter();
  saveLocal();
};