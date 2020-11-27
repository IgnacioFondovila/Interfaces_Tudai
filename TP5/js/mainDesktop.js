"use strict";

//------------------------------------------------------------HACER
//Agregar cambios en SVG de LIKE , SUBSCRIPCION
//Modificar como se muestran los temas utilizando una animación
//Subir volumen
//AGREGAR OPTIONS desplegable
//-----------------------------------------------------------------
/* Ocultar listas de usuario */

let buttonUserDesktop = document.querySelectorAll(".buttonCollections");
let collectionsUser = document.querySelectorAll(".contenedorListaUser");
let lastClickedDesktop = null;

for (let boton = 0; boton < buttonUserDesktop.length; boton ++) {
    buttonUserDesktop[boton].addEventListener("click", function() {
        collectionsUser[boton].style.transition = "2s"; 
        if (collectionsUser[boton] == lastClickedDesktop) {
            collectionsUser[boton].style.display = "none";
            buttonUserDesktop[boton].style.width = "200px";
            buttonUserDesktop[boton].style.borderRadius = "40px";
            lastClickedDesktop = null;
        } else {
            collectionsUser[boton].style.display = "flex";
            buttonUserDesktop[boton].style.borderRadius = "40px 40px 0px  0px";
            buttonUserDesktop[boton].style.width = "300px";
            lastClickedDesktop = collectionsUser[boton];
        }
        ocultarRestantesHome(collectionsUser[boton]);
    });
}

function ocultarRestantesHome(botonSeleccionado) {
    for (let boton = 0; boton < buttonUserDesktop.length; boton ++) {
        if(collectionsUser[boton] != botonSeleccionado) {
            collectionsUser[boton].style.display = "none";
            buttonUserDesktop[boton].style.width = "200px";
            buttonUserDesktop[boton].style.borderRadius = "40px";
            collectionsUser[boton].style.transition = "2s";
        }
    }
}

/* Ver más en Home y Search */
let verMas = document.querySelectorAll(".verMas");
let verMenosDesplegado = null;
for (let botonVerMas = 0; botonVerMas < verMas.length; botonVerMas ++) {
    verMas[botonVerMas].addEventListener("click", function() {
        let ocultador = verMas[botonVerMas].nextElementSibling;
        let ocultos = verMas[botonVerMas].previousElementSibling;
        ocultos.classList.remove("hidden");
        verMas[botonVerMas].classList.add("hidden");
        ocultador.classList.remove("hidden");
        // let verMenos = this.getElementsByClassName("verMenos");
        let verMenos = this.nextElementSibling;
        verMenos.addEventListener("click",function(){ocultarVerMenos(this)})
        verMenosDesplegado = ocultos;
    });
} 
function ocultarVerMenos(verMenos){
    let container=verMenos.parentElement
    let listShow=container.getElementsByClassName("contenedorAudiosDesktop")[1]
    listShow.classList.add("hidden")
    let mas=verMenos.previousElementSibling
    console.log(mas)
    mas.classList.remove("hidden")
    verMenos.classList.add("hidden")
}

// ------------------VISUALIZAR PERFILES-----------------------------


let exitProfile=document.querySelector("#x_desktop").parentElement

let profiles =document.querySelectorAll(".desktopProfile")
// let header = document.getElementsByTagName("header");
let profClicked = null;

let seeProf = document.querySelectorAll(".seeProfDesktop");
console.log(seeProf)
for (let see of seeProf){
    // console.log(see)
    let inptArchive= see.getElementsByTagName("input")[0].value
    // console.log(inptArchive)
    see.addEventListener("click", function() { slideProfile(inptArchive) })
}

//archive define que archivo Drop debo mostrar)(artista,song,etc)
function slideProfile(archive) {
    console.log(archive)
    //obtengo el drop del archive y lo muestro
    for(let profDrop of profiles) {
        let typeAudio = profDrop.getAttribute("data-value");
        console.log(typeAudio)
        if(archive == typeAudio) {
            if(archive == "ownPlaylist" && presionado) {
                desplegableMyPlaylist.classList.add("hidden");
            }
            exitProfile.classList.remove("hidden");
            profDrop.classList.remove("hidden");
            profDrop.classList.add("dropFijo");
            let coments=profDrop.getElementsByClassName("comentDisplay")
            display3dComents(coments)
            console.log(coments)
            // profDrop.onscroll=function(e){showOpiniosOnScroll(e,this)}
            profClicked = profDrop;
            console.log(profDrop)
        }
    }
    console.log(profiles)
    // hiddeOpinionsCards()
}

function display3dComents(coments){
    for(let coment of coments){
        coment.classList.add("slide-rotate-hor-top")
        coment.classList.remove("hidden")
    }
}

exitProfile.addEventListener("click", function() {
    exitProfile.classList.add("hidden");
    profClicked.classList.remove("dropFijo");
    profClicked.classList.add("hidden");
    profClicked = null;
    hiddeOpinionsCards()
});


//Visualizacion 3d

function mouseMove(personaje, e) {
    let xPerson = (window.innerWidth / 5 - e.offsetX) / 10;
    let yPerson = (window.innerHeight / 5 - e.offsetY) / 10;
    personaje.style.transform = `rotateX(${xPerson}deg) rotateY(${yPerson}deg)`;
    personaje.style.transition = "none"; 
}
  
function mouseLeave(personaje) {
personaje.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;
personaje.style.transition = "3s"; 
}

window.SetVolume = function(val)
{
    var player = document.getElementById('audioSong');
    console.log('Before: ' + player.volume);
    player.volume = val / 100;
    console.log('After: ' + player.volume);
}

/* ver mi playlist */

let miPlaylist = document.querySelector(".desplegableMyPlaylist");
let desplegableMyPlaylist = document.querySelector(".OwnPlaylist");
let presionado = false;

miPlaylist.addEventListener("click", function() {
    if(!presionado) {
        desplegableMyPlaylist.classList.remove("hidden");
        presionado = true;
    }
    else {
        desplegableMyPlaylist.classList.add("hidden"); 
        presionado = false;
    }
})