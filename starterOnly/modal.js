function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


//RAJOUTS

//rajout de l'event onclick du menu burger
document.querySelector('a.icon').addEventListener("click", editNav);

//rajout de l'event onsubmit du formulaire
document.querySelector('form[name="reserve"]').addEventListener("submit", validateForm)

//fonction de validation du formulaire
function validateForm() {

}