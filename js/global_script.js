 
 
 function cart_items_number(){
 
 let cart = JSON.parse(localStorage.getItem("cart")) || [];

 let  items_in_card = 0;

 let number = document.getElementById("number_of_items");

 if (cart.length === 0) {

     number.innerHTML = "";

    return;

 }

 items_in_card = parseInt(cart.length);


 number.innerHTML = items_in_card.toString();

 

 

}

/* -------------------- Initialisierung beim Laden der Seite -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  cart_items_number();
});

