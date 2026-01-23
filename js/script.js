/* -------------------- Produktdaten -------------------- */
const products = [
  { id: 1, name: "T-Shirt", price: 19.99, img: "images/tshirt.jpg" },
  { id: 2, name: "Hoodie", price: 39.99, img: "images/hoodie.jpg" },
  { id: 3, name: "Cap", price: 14.99, img: "images/cap.jpg" }
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
      <p class="desc">Kurze Produktbeschreibung hier.</p>
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
