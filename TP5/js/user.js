"use strict";


/* Cambiar colores de navegador */


/* Desplegar configuración. */

let configClick = document.getElementById("configInput");
let xClick = document.getElementById("xConfig");
let configDesplegable = document.querySelector(".config");
configDesplegable.style.maxWidth = "0px";
configDesplegable.style.padding = "0%";

configClick.addEventListener("click", function(e) {
    configDesplegable.style.transition = "0.7s";
    configDesplegable.style.maxWidth = "260px";
    configDesplegable.style.padding = "4%";
});

xClick.addEventListener("click", function() {
    configDesplegable.style.transition = "0s";
    configDesplegable.style.maxWidth = "0px";
    configDesplegable.style.padding = "0%";
});