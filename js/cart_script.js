/* -------------------- Warenkorb anzeigen -------------------- */
  

function renderCart() {
  const cartList = document.getElementById("cart-list");
  const totalText = document.getElementById("total");
  if (!cartList) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
    if (totalText) totalText.textContent = "Gesamt: 0.00 €";
  } else {
    cartList.innerHTML = "";
    let total = 0;

    
/* -------------------- Itemanzahl speichern (Ids) -------------------- */
    let product_index = [];

    let product_count = [];



    cart.forEach(product => {     

        product_index.push(parseInt(product.id)); 

           
    });

    



/* -------------------- Produkte im Cart anzeigen mit der richtigen Anzahl -------------------- */

    cart.forEach((product, index) => {
      total += product.price;

      let item_count = parseInt(product_index.filter(x => x == parseInt(product.id)).length);

      const item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <div class="cart-item-info">
          <p>${product.name}</p>
          <p>${product.price.toFixed(2)} €</p>
          <p>Menge: ${item_count.toString()}</p>          
        </div>
        <button onclick="removeFromCart(${index})">Entfernen</button>
      `;

      product_count.push(parseInt(product.id));

      let product_counter = parseInt(product_count.filter(x => x == parseInt(product.id)).length);

      if(product_counter <= 1){

      cartList.appendChild(item);

      }
    });

    if (totalText) totalText.textContent = "Gesamt: " + total.toFixed(2) + " €";
  }
}

/* -------------------- Produkt aus Warenkorb entfernen -------------------- */
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const removedProduct = cart[index];

  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  cart_items_number();

  renderCart();

  Toastify({
    text: removedProduct.name + " wurde entfernt!",
    duration: 2000,
    gravity: "bottom",
    position: "right",
    style: { background: "#dc3545" }
  }).showToast();

  
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

/* -------------------- Einkaufen simulieren und Warenkorb leeren -------------------- */

function checkout(){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){

      Toastify({
    text: " Dein Cart ist leer!",
    duration: 2000,
    gravity: "bottom",
    position: "right",
    destination: "products.html",
    style: { background: "#dc3545" }
  }).showToast();


      return;

    }

    const totalText = document.getElementById("total");

    Toastify({
    text: 'Vielen Dank für deine Bestellung über ' + totalText.innerHTML,
    duration: 4000,
    gravity: "top",
    position: "right",
    style: { background: "#dc3545" }
  }).showToast();

    localStorage.setItem("cart", JSON.stringify(""));

    renderCart();

    cart_items_number();

    

}