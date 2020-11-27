"use strict";


let botonesLog = document.getElementsByClassName("buttonLog");
let formLog = document.querySelectorAll(".formLog");
let lastClicked = null;

for (let boton = 0; boton < botonesLog.length; boton ++) {
    botonesLog[boton].addEventListener("click", function() {
        formLog[boton].style.transition = "2s"; 
        if (formLog[boton] == lastClicked) {
            formLog[boton].style.height = "0px";
            botonesLog[boton].style.width = "200px";
            botonesLog[boton].style.borderRadius = "40px";
            lastClicked = null;
        } else {
            formLog[boton].style.height = "auto";
            botonesLog[boton].style.borderRadius = "40px 40px 0px  0px";
            botonesLog[boton].style.width = "240px";
            lastClicked = formLog[boton];
        }
        ocultarRestantesMobile(formLog[boton]);
    });
}

function ocultarRestantesMobile(botonSeleccionado) {
    for (let boton = 0; boton < botonesLog.length; boton ++) {
        if(formLog[boton] != botonSeleccionado) {
            formLog[boton].style.height = "0px";
            botonesLog[boton].style.width = "200px";
            botonesLog[boton].style.borderRadius = "40px";
            formLog[boton].style.transition = "2s";
        }
    }
}


