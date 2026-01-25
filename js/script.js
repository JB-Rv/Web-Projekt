/* -------------------- Produktdaten -------------------- */
const products = [
  { id: 1, 
    name: "T-Shirt", 
    price: 19.99, 
    img: "images/tshirt.jpg", 
    disicrption: "Ein bequemes T-Shirt aus 100% Baumwolle." },

  { id: 2, 
    name: "Hoodie", 
    price: 39.99, 
    img: "images/hoodie.jpg",
    disicrption: "Ein warmer Hoodie für kalte Tage." },

  { id: 3, 
    name: "Cap", 
    price: 14.99, 
    img: "images/cap.jpg",
    disicrption: "Eine stylische Cap für sonnige Tage." },

  { id: 4, 
    name: "Bag", 
    price: 6.99, 
    img: "images/bag.png",
    disicrption: "Eine praktische Tasche für den Alltag." }, 

  { id: 5, 
    name: "Keychain", 
    price: 3.99, 
    img: "images/keychain.png",
    disicrption: "Ein cooler Schlüsselanhänger." }, 

  { id: 6, 
    name: "Trinkflasche", 
    price: 16.99, 
    img: "images/drinkbottle.png",
    disicrption: "Eine wiederverwendbare Trinkflasche." }, 

  { id: 7, 
    name: "Socken", 
    price: 9.99, 
    img: "images/socks.png",
    disicrption: "Bequeme und stylische Socken." }, 

  { id: 8, 
    name: "USB-Stick", 
    price: 4.99, 
    img: "images/usb.png",
    disicrption: "Ein praktischer USB-Stick." }, 

  { id: 9, 
    name: "Tasse", 
    price: 6.99, 
    img: "images/cup.png",
    disicrption: "Eine Tasse für deinen Lieblingskaffee." }, 

  { id: 10, 
    name: "Textmarker", 
    price: 1.99, 
    img: "images/highlighter.png",
    disicrption: "Ein bunter Textmarker für wichtige Notizen." }, 
  
  { id: 11, 
    name: "Schreibblock", 
    price: 2.99, 
    img: "images/notepad.png",
    disicrption: "Ein praktisches Notizbuch für deine Gedanken." },

  { id: 12, 
    name: "Notizbuch", 
    price: 4.99, 
    img: "images/notebook.png",
    disicrption: "Ein stylisches Notizheft für Schule und Arbeit." }

];

/* -------------------- Produkte rendern -------------------- */
function renderProducts(list = products) {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">${product.price.toFixed(2)} €</p>
      <p class="desc"> ${product.disicrption} </p>
      <button onclick="addToCart(${product.id})">In den Warenkorb</button>
    `;

    productList.appendChild(card);
  });
}

/* -------------------- In den Warenkorb legen -------------------- */
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);
  
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  Toastify({
    text: product.name + " wurde in den Warenkorb gelegt!",
    duration: 2000,
    gravity: "bottom",
    position: "right",
    style: { background: "#007bff" }
  }).showToast();
}

/* -------------------- Warenkorb rendern -------------------- */
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

    cart.forEach((product, index) => {
      total += product.price;

      const item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <div class="cart-item-info">
          <p>${product.name}</p>
          <p>${product.price.toFixed(2)} €</p>
        </div>
        <button onclick="removeFromCart(${index})">Entfernen</button>
      `;
      cartList.appendChild(item);
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

  renderCart();

  Toastify({
    text: removedProduct.name + " wurde entfernt!",
    duration: 2000,
    gravity: "bottom",
    position: "right",
    style: { background: "#dc3545" }
  }).showToast();
}

/* -------------------- Suchfunktion -------------------- */
function searchProducts() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}

function resetSearch() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  renderProducts();
}

/* -------------------- Preis sortieren (hoch → niedrig) -------------------- */
function sortPriceHighToLow() {
  // Erstellt eine Kopie des Arrays, bevor sortiert wird
  const sorted = [...products].sort((a, b) => b.price - a.price);
  renderProducts(sorted);
}

/* -------------------- Initialisierung beim Laden der Seite -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});
