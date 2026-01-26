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

/* -------------------- Produkte anzeigen -------------------- */
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

  cart_items_number();

  Toastify({
    text: product.name + " wurde in den Warenkorb gelegt!",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    destination: "cart.html",
    style: { background: "hsl(250, 84%, 75%)" }
  }).showToast();

  
}

/* -------------------- Filter nach ausgewählter Option vor Search -------------------- */
function getFilterValue(filtered){

  const value = document.getElementById("filter").value;
        

    switch (value) {
      case "0":
        return filtered;
        
      case "1":
        return [...filtered].sort((a, b) => b.price - a.price);
        
      case "2":
       return [...filtered].sort((a, b) => a.price - b.price);
       
      case "3":
        return [...filtered].sort((a, b) =>  a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        
      case "4":
        return [...filtered].sort((a, b) =>  b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
        
    }



}




/* -------------------- Suchfunktion -------------------- */
function searchProducts() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filtered = getFilterValue(products).filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}


/* -------------------- Preis sortieren (hoch → niedrig) -------------------- */
function sortPriceHighToLow(values) {
  // Erstellt eine Kopie des Arrays, bevor sortiert wird
  const sorted = [...values].sort((a, b) => b.price - a.price);
  renderProducts(sorted);
}

/* -------------------- Preis sortieren (niedrig → hoch) -------------------- */
function sortPriceLowToHigh(values) {
  // Erstellt eine Kopie des Arrays, bevor sortiert wird
  const sorted = [...values].sort((a, b) => a.price - b.price);
  renderProducts(sorted);
}


/* -------------------- Preis sortieren (hoch → niedrig) -------------------- */
function sortNameAZ(values) {
  // Erstellt eine Kopie des Arrays, bevor sortiert wird
  const sorted = [...values].sort((a, b) =>  a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  renderProducts(sorted);
}

/* -------------------- Preis sortieren (hoch → niedrig) -------------------- */
function sortNameZA(values) {
  // Erstellt eine Kopie des Arrays, bevor sortiert wird
  const sorted = [...values].sort((a, b) =>  b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
  renderProducts(sorted);
}










/* -------------------- Initialisierung beim Laden der Seite -------------------- */
document.addEventListener("DOMContentLoaded", () => {  
  renderProducts();
});


/* -------------------- Initialisierung beim Laden der Seite für den Filter -------------------- */
document.getElementById("filter").addEventListener("change", function () {
    const value = this.value;

    const query = document.getElementById("search-input").value.toLowerCase();
         const filtered = products.filter(p => p.name.toLowerCase().includes(query));
        

    switch (value) {
      case "0":
        renderProducts(filtered);
        break;
      case "1":
        sortPriceHighToLow(filtered);
        break;
      case "2":
        sortPriceLowToHigh(filtered);
        break;
      case "3":
        sortNameAZ(filtered);
        break;
      case "4":
        sortNameZA(filtered);
        break;
    }
  });
