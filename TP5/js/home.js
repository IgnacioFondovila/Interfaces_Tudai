"user strict";

/* Nav */

let btnHome = document.querySelector("#btnHome")
let btnSearch = document.querySelector("#btnSearch")
let btnUser = document.querySelector("#btnUser")

function setButtonsHome() {
    // btnHome.getElementsByTagName(img).item
    btnHome.className = '';
    btnHome.classList = "selected";   
    btnSearch.className = '';
    btnSearch.classList = "search_for_home displayHoriz";
    btnUser.className ='';
    btnUser.classList = "displayHoriz";
}

function setButtonsSearch(){
    // btnSearch.getElementsByTagName(img).item
    btnSearch.className = '';
    btnSearch.classList = "selected";   
    btnHome.className = '';
    btnHome.classList = "home_for_search displayHoriz";
    btnUser.className = '';
    btnUser.classList = "user_for_search displayHoriz";
}

function setButtonsUser(){
    // btnHome.getElementsByTagName(img).item
    btnUser.className = '';
    btnUser.classList = "selected";   
    btnHome.className = '';
    btnHome.classList = "home_for_user displayHoriz";
    btnSearch.className = '';
    btnSearch.classList = "home_for_search displayHoriz";
}
/*---------Listado 3d Home-----------------*/

let audioContents = document.querySelectorAll(".contenedorAudios");
for(let audioContent of audioContents){
    audioContent.onscroll=function(e){showColItemsOnScroll(e,this)}
}

let x_StartPos=1;
function showColItemsOnScroll(e,itemsContainer){
    let aux=itemsContainer.scrollLeft;
    let x_LastPos=aux
    let items=itemsContainer.getElementsByClassName("seeDropDown")
    console.log(x_StartPos)
    if(itemsContainer!=audioContents[0]){
        console.log(x_StartPos)
        if(x_StartPos>=20&& x_StartPos<28){
            if(x_LastPos>x_StartPos){
                console.log("rigth1")
                show_in_out(items[0],items[2])       
                // items[0].classList.add("rotate-center-in")
                // items[2].classList.add("rotate-center-out")
                // items[0].classList.remove("rotate-center-out")
                // items[2].classList.remove("rotate-center-in")

                // items[2].classList.add("slide-rotate-ver-left")
                // items[0].classList.add("slide-rotate-ver-right")
            }else{
                console.log("left1")
                show_in_out(items[2],items[0])       
                // items[0].classList.add("rotate-center-out")
                // items[2].classList.add("rotate-center-in")
                // items[0].classList.remove("rotate-center-in")
                // items[2].classList.remove("rotate-center-out")
                
                // items[2].classList.remove("slide-rotate-ver-left")
                // items[0].classList.remove("slide-rotate-ver-right")
                // items[0].classList.add("slide-rotate-ver-left")
                // items[2].classList.add("slide-rotate-ver-right")
            }
            // items[2].classList.add("rotate-center")
        }
        if(x_StartPos>=158&& x_StartPos<178){
            
            if(x_LastPos>x_StartPos){
                console.log("rigth2")
                show_in_out(items[1],items[3])       
                // items[1].classList.remove("rotate-center-out")
                // items[3].classList.remove("rotate-center-in")
                // items[1].classList.add("rotate-center-in")
                // items[3].classList.add("rotate-center-out")
            }else{
                show_in_out(items[3],items[1])       
                console.log("left2")
                // items[1].classList.remove("rotate-center-in")
                // items[3].classList.remove("rotate-center-out")
                // items[1].classList.add("rotate-center-in")
                // items[3].classList.add("rotate-center-out")
            }
        // if(x_StartPos>=143&& x_StartPos<158){
            // //    items[2].classList.add("slide-rotate-ver-left")
            //    items[3].classList.add("rotate-center")
            // }
        }
        x_StartPos=itemsContainer.scrollLeft;
    }
}

function show_in_out(inner,outer){
    // inner.classList.remove("rotate-center-out")
    // outer.classList.remove("rotate-center-in")
    // inner.classList.add("rotate-center-in")
    // outer.classList.add("rotate-center-out")
    inner.classList.togle("rotate-center-out")
    outer.classList.togle("rotate-center-in")
    inner.classList.togle("rotate-center-in")
    outer.classList.togle("rotate-center-out")

}