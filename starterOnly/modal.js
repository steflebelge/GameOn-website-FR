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

//fonction de sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// quit modal form
async function quitModal() {
    modalbg.firstElementChild.style.animationName = "modalClose";
    await sleep(750);
    modalbg.style.display = "none";
    modalbg.firstElementChild.style.animationName = "modalopen";
}




//______________________________________________
//Chargement de la page :
//rajout de l'event onclick du menu burger
document.querySelector('a.icon').addEventListener("click", editNav);

//rajout de l'event close de la modale
document.querySelector('span.close').addEventListener("click", quitModal);

//rajout de l'event onsubmit du formulaire
document.querySelector('form[name="reserve"]').addEventListener("submit", function (event) {
    if (!validateForm())
        event.preventDefault();
});

//si bouton radio coché au chargement, on le décoche
if (modalbg.querySelector('input[name="location"]:checked'))
    modalbg.querySelector('input[name="location"]:checked').checked = false;

//On pré remplit les content des formData avec " "
document.querySelectorAll("div.formData").forEach(function (divTmp) {
    divTmp.dataset.error = " ";
});
//______________________________________________





//fonction de validation du formulaire
function validateForm() {
    let isValid = true;

    //réinitialise les erreurs du formulaire
    //On pré remplit les content des formData avec " "
    document.querySelectorAll("div.formData[data-error-visible='true']").forEach(function (divTmp) {
        divTmp.dataset.error = " ";
        divTmp.dataset.errorVisible = "false";
    });

    //parcours des input.text-control
    modalbg.querySelectorAll('input.text-control').forEach(function (inputTmp) {
        if (!inputTmp.checkValidity()) {
            isValid = false;
            errorInField(inputTmp);
        }
    });

    //verification qu une localisation a bien été cochée
    if (!modalbg.querySelector('input[name="location"]:checked')) {
        isValid = false;
        errorInField(modalbg.querySelector('input[name="location"]'));
    }

    //verification que les CGU ont bien ete acceptée
    if (!document.querySelector('input#checkbox1').checkValidity()) {
        isValid = false;
        errorInField(document.querySelector('input#checkbox1'));
    }

    return isValid;
}

//fonction de gestion d'une erreur
function errorInField(elt) {
    debugger
    //recuperation du message d'erreur de l'api validation
    let msgError = elt.validationMessage ;

    //cas specifique : location1 car validation message = "" et msg des CGU
    if(elt.id === "location1")
        msgError = "Veuillez selectionner une ville."
    else if(elt.id === "checkbox1")
        msgError = "Veuillez accepter les conditions d'utilisations pour pouvoir poursuivre."

    //recuperation de la div.formData correspondante a l'element
    let formDataElt = elt;
    while (!formDataElt.classList.contains('formData')) {
        formDataElt = formDataElt.parentElement;
    }

    //passage de cette div en erreur
    formDataElt.dataset.errorVisible = true;

    //set de sa data-error pour affichage du message
    formDataElt.dataset.error = msgError;
}