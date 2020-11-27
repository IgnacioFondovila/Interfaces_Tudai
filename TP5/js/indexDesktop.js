"use strict";

let botonesLogDesk = document.getElementsByClassName("buttonLogDesktop");
let formLogDesk = document.querySelectorAll(".formLogDesktop");
let lastClickedDesk = null;

for (let boton = 0; boton < botonesLogDesk.length; boton ++) {
    botonesLogDesk[boton].addEventListener("click", function() {
        formLogDesk[boton].style.transition = "2s"; 
        if (formLogDesk[boton] == lastClickedDesk) {
            formLogDesk[boton].style.height = "0px";
            botonesLogDesk[boton].style.width = "200px";
            botonesLogDesk[boton].style.borderRadius = "40px";
            lastClickedDesk = null;
        } else {
            formLogDesk[boton].style.height = "auto";
            botonesLogDesk[boton].style.borderRadius = "40px 40px 0px  0px";
            botonesLogDesk[boton].style.width = "570px";
            lastClickedDesk = formLogDesk[boton];
        }
        ocultarRestantesDesktop(formLogDesk[boton]);
    });
}

function ocultarRestantesDesktop(botonSeleccionado) {
    for (let boton = 0; boton < botonesLogDesk.length; boton ++) {
        if(formLogDesk[boton] != botonSeleccionado) {
            formLogDesk[boton].style.height = "0px";
            botonesLogDesk[boton].style.width = "200px";
            botonesLogDesk[boton].style.borderRadius = "40px";
            formLogDesk[boton].style.transition = "2s";
        }
    }
}