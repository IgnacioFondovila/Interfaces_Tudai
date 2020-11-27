
let dropsDown = document.querySelectorAll(".dropDown");
let header = document.getElementsByTagName("header");
let dropClicked = null;


/* Desplegar DropDown Options*/
let seeOptions = document.querySelectorAll(".seeDropDown");

for (let seeOpt of seeOptions){
    let inptArchive= seeOpt.getElementsByTagName("input")[0].value

    seeOpt.addEventListener("click", function() { slideDropDown("option",inptArchive) })
}

/* Desplegar DropDown Profiles*/

let seeProfiles = document.querySelectorAll(".seeProfile")

for (let seeProf of seeProfiles){
    let inpt= seeProf.getElementsByTagName("input")
    let inptArchive= inpt[0].value
    seeProf.addEventListener("click", function() { slideDropDown("profile",inptArchive)})
}

//type define que Tipo de Drop debo mostrar(Profile or Option)
//archive define que archivo Drop debo mostrar)(artista,song,etc)
function slideDropDown(type,archive) {
    console.log(type)
    console.log(archive)
    let typeItems=document.querySelectorAll("."+type)
    if(type!="option"){
        //muestro todos los items de perfiles
        for(let type of typeItems) {
            type.classList.remove("hidden");
            dropClicked = type;
        }
        let NOtypeItems=document.querySelectorAll(".option")
        //todos los option se esconden
        for(let type of NOtypeItems) {
            type.classList.add("hidden");
            dropClicked = type;
        }
    }else{
        //muestra todos los items de options
        for(let type of typeItems) {
            type.classList.remove("hidden");
        }
        let NOtypeItems=document.querySelectorAll(".profile")
        //escondes todos los perfiles
        for(let type of NOtypeItems) {
            type.classList.add("hidden");
        }
    }
        //obtengo el drop del archive y lo muestro
    for(let drop of dropsDown) {
        let typeAudio = drop.getAttribute("data-value");
        if(archive == typeAudio) {
            drop.classList.remove("hidden");
            drop.classList.add("dropFijo");
            drop.onscroll=function(e){showOpiniosOnScroll(e,this)}
            dropClicked = drop;
        }
        header[0].style.display = "none";
    }
    hiddeOpinionsCards()
}


/* Ocultar DropDown */

let xDrop = document.querySelectorAll(".xDrop");
for (let x = 0; x < xDrop.length; x ++) {
    xDrop[x].addEventListener("click", function() {
        dropClicked.classList.remove("dropFijo");
        dropClicked.classList.add("hidden");
        dropClicked = null;
        header[0].style.display = "flex";
        hiddeOpinionsCards()
    });
}

/* ---------------------Ver opiniones ---------------------*/

function showOpiniosOnScroll(e,windowPage){
    let y_StartPos=windowPage.scrollTop;
    console.log(y_StartPos)
    let name=windowPage.getElementsByClassName("profileData")[0]
    console.log(windowPage)
    let optionDrop=name.classList.contains("hidden")
    let coments=windowPage.getElementsByClassName("comentDisplay")
    let verMas=coments[2].nextElementSibling
    if(optionDrop){
    
        let typeDrop=windowPage.getAttribute("data-value")
            
        if( typeDrop=="artist"||typeDrop=="playlist"){
            let indexStart=150
            add3dOptions(indexStart,y_StartPos,coments,verMas)
        }else if(typeDrop=="podcast" || typeDrop=="episode" ){
            let indexStart=201
            add3dOptions(indexStart,y_StartPos,coments,verMas) 
        }else if(typeDrop=="ownPlaylist"){
            let indexStart=140
            add3dOptions(indexStart,y_StartPos,coments,verMas)       
        }else if(typeDrop=="song"){
            let indexStart=225
            add3dOptions(indexStart,y_StartPos,coments,verMas)       
        }else if(typeDrop=="disk"){//disk
            let indexStart=203
            add3dOptions(indexStart,y_StartPos,coments,verMas)       
        }
    }else{
        let indexProfiles=125
        add3dOptions(indexProfiles,y_StartPos,coments,verMas)
    }

}

function add3dOptions(indexStart,y_StartPos,coments,verMas){
    if(y_StartPos>=indexStart&& y_StartPos<indexStart+100){
        coments[0].classList.add("slide-rotate-hor-top")
        coments[0].classList.remove("hidden")
    }
    if(y_StartPos>=indexStart*2&&y_StartPos<indexStart*2+100){
        coments[1].classList.add("slide-rotate-hor-top")
        coments[1].classList.remove("hidden")
        // console.log(e.scrollY)
    }
    if(y_StartPos>=indexStart*3&&y_StartPos<indexStart*3+100){
        coments[2].classList.add("slide-rotate-hor-top")
        coments[2].classList.remove("hidden")
    }
    if(y_StartPos>=indexStart*3+50){
        verMas.classList.add("slide-rotate-hor-top")
        verMas.classList.remove("hidden")
    }
}


//------------------------------------------------------------HACER

//AGREGAR AL INDIO Y UN EPISODIO DE PODCAST AL HOME

function hiddeOpinionsCards(){
    let coments=document.getElementsByClassName("comentDisplay")
    for(let cmnt of coments ){
        cmnt.classList.remove("slide-rotate-hor-top")
        cmnt.classList.add("hidden")
    }
}

/* Ver form opiniones */

let submitsOpinion = document.getElementsByClassName("submitOpinion");
for(let subm of submitsOpinion){
    let submFather=subm.parentElement
    subm.addEventListener("click",function () {
        let form=submFather.parentElement
        form.style.transition = "2s"; 
        form.style.height = "0px";
        let btnForm=form.previousElementSibling;
        btnForm.style.width = "200px";
        btnForm.style.borderRadius = "40px";
    })
}

let buttonsOpinion = document.getElementsByClassName("buttonOpinions");
let formOpinion = document.querySelectorAll(".formOpinion");
let lastClicked = null;

for (let boton = 0; boton < buttonsOpinion.length; boton ++) {
    buttonsOpinion[boton].addEventListener("click", function() {
        formOpinion[boton].style.transition = "2s"; 
        if (formOpinion[boton] == lastClicked) {
            formOpinion[boton].style.height = "0px";
            buttonsOpinion[boton].style.width = "200px";
            buttonsOpinion[boton].style.borderRadius = "40px";
            lastClicked = null;
        }
        else {
            formOpinion[boton].style.height = "auto";
            buttonsOpinion[boton].style.width = "280px";
            buttonsOpinion[boton].style.borderRadius = "40px 40px 0px  0px";
            lastClicked = formOpinion[boton];
        }
    });
}

/*Calificar con estrellas*/
let estrellas = document.getElementsByClassName("estrella");

let estrellasSelected = document.getElementsByClassName("estrellaSelected");

for(let e = 0; e < estrellas.length; e ++) {
    estrellas[e].addEventListener("click", function() {
        if(estrellas[e] == estrellas[0]) {
            
            console.log("es la primera")
            /* estrellas[e].getSVGDocument().getElementById("svgInternalID").setAttribute("fill", "networking") */
            let svgStar=estrellas[e].getElementsByTagName("svg")[0]
            svgStar.lastElementChild.setAttribute("fill",("#BDFF00"))
           }else{
                let fat=estrellas[e].previousElementSibling
                console.log(estrellas[e].getAttribute("data-value"))
                paintStar(fat.parentElement,estrellas[e].getAttribute("data-value"),true)
           }
        // else {
        //     for(let st=0;st<=e;st++){
        //         let svgStar= estrellas[st].getElementsByTagName("svg")[0]
        //         svgStar.lastElementChild.setAttribute("fill",("#BDFF00"))               
        //     }
        //     // llamo funcion hasta mi
        // }
    }); 
}
function paintStar(colectionStars,positionStarClicked,print){
    let stars=colectionStars.getElementsByClassName("estrella")
    for(let st=0;st<positionStarClicked;st++){
        if(print){
            let svgStar=stars[st].getElementsByTagName("svg")[0]
            svgStar.lastElementChild.setAttribute("fill",("#BDFF00"))
        }else{ 
            let svgStar=stars[st].getElementsByTagName("svg")[0]
            svgStar.lastElementChild.setAttribute("fill",("#353535"))
        }
    }
}

let elimCalification =document.getElementsByClassName("deleteCalif");
for (let elim of elimCalification){
    elim.addEventListener("click",function() {
        console.log(elim.previousElementSibling)
        elim.previousElementSibling   
        paintStar(elim.previousElementSibling,5,false)
    })
}


