/* -------------------- Initialisierung beim Laden der Seite -------------------- */
document.addEventListener("DOMContentLoaded", () => {

    console.log("Wechsel Logo Funktion gestartet");

  wechselLogo();
});


function wechselLogo() {
  let logo = document.getElementById("nav-logo");
  
  logo.addEventListener("mouseover", function() {
    logo.src = "images/start_hover.png";
  });
  
  logo.addEventListener("mouseout", function() {
    logo.src = "images/start.png";
  });
};
