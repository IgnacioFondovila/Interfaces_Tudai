"use strict";
let loaderBox=document.querySelector(".loader");
let loaderClock=document.querySelector(".clock");
let all=document.querySelector(".bigContainer");
let nav=document.querySelector(".nav");
// let loaderCar=document.querySelector(".carLoad");
let btnsNav=document.querySelectorAll(".btnsNav");

setTimeout(hidLoader,3000);
function hidLoader(){
    loaderBox.hidden=true
    loaderClock.hidden=true
    nav.style.visibility= "visible";
    all.style.visibility= "visible";
}
/////
for(let i=0;i<btnsNav.length;i++){
    btnsNav[i].onmouseover=function(e){navBtnHover(this,e)}
    btnsNav[i].onmouseleave=function(e){navBtnLeave(this,e)}
}
let btnBurg=document.querySelector("#burger");
let pages=document.querySelector(".pages")
let leave=false;


btnBurg.onmouseup=function(e){seePages()}
btnBurg.onmouseover=function(e){navBtnHover(this,e)}
btnBurg.onmouseleave=function(e){navBtnLeave(this,e)}



pages.onmouseleave=function(){
    pages.style.animation= " reduceCard 1s ease-out"
    btnBurg.addEventListener("onmouseleave",reduceCard())
    reduceCard()
    setTimeout(function name(params) {
        pages.hidden=true
    },999)
}

function navBtnHover(btn,e){
    btn.style.transform="translate(1px,9px)"
    btn.style.transform="scale(1.2)"
    // logo.style.animation= "hover 2s ease-in"
}

function navBtnLeave(btn,e){
    btn.style.transform="translate(-1px,-7px)"
    // logo.style.animation= "out 2s ease-in"
}

function seePages(){
    pages.style.animation= " ampliateCard 2s linear"
    let a=pages.getElementsByTagName('a');
    for(let i in a){
        (function(i){
            a[i].style.transition="max-height: 100vh"  
    })
    }
    pages.hidden=false;
    btnBurg.removeEventListener("onmouseleave",reduceCard);
}

function reduceCard(){
    pages.style.animation= " reduceCard 1s linear"
    let a=pages.getElementsByTagName('a');
    for(let i in a){
        (function(i){
        a[i].style.transition="max-height: 0px"  
       })
    }
    // pages.hidden=true;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
