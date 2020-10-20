"use strict";
let loaderBox=document.querySelector(".loader");
let loaderClock=document.querySelector(".clock");
let all=document.querySelector(".bigContainer");
// let loaderCar=document.querySelector(".carLoad");

setTimeout(hidLoader,3000);
function hidLoader(){
    loaderBox.hidden=true
    loaderClock.hidden=true
    all.hidden=false 
}
/////

let logo=document.querySelector(".home");
let btnBurg=document.querySelector("#burger");
let pages=document.querySelector(".pages")
let leave=false;


logo.onmouseover=function(e){navBtnHover(this,e)}
logo.onmouseleave=function(e){navBtnLeave(this,e)}
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


////////////////////countDownn//////////////////
let count=document.getElementById("countdown");
let infoHead=document.createElement("h1");
let infoH=document.createTextNode("El estreno sera en:");
infoHead.append(infoH);
infoHead.className="countHead";
let infoFoot=document.createElement("tr")
let Idays=document.createElement("td")
let d=document.createTextNode("Dias")
Idays.append(d)
let Ihours=document.createElement("td")
let h=document.createTextNode("Horas")
Ihours.append(h)
let Iminutes=document.createElement("td")
let m=document.createTextNode("Mins")
Iminutes.append(m)
let Iseconds=document.createElement("td")
let s=document.createTextNode("Segs")
Iseconds.append(s)
infoFoot.append(Idays,Ihours,Iminutes,Iseconds);
infoFoot.className="trFoot";

var countDownDate = new Date("Dec 1, 2021 16:20:00").getTime();
let dateDiv=document.createElement("p");

function digitalCountdown(){
    
    removeAllChildNodes(count)
    
    let now = new Date();
    let date=countDownDate-now;
    let hoursDiv=document.createElement("tr")
    
    hoursDiv.className="dates";
    
    let day = document.createTextNode(Math.floor(date / (1000 * 60 * 60 * 24)));
    let hour =document.createTextNode(Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let min = document.createTextNode(Math.floor((date % (1000 * 60 * 60)) / (1000 * 60)));
    let sec = document.createTextNode(Math.floor((date % (1000 * 60)) / 1000));   
    
    let days=document.createElement("td")
    let hours=document.createElement("td")
    let minutes=document.createElement("td")
    let seconds=document.createElement("td")

    days.className="day";
    hours.className="hour";
    minutes.className="minute";
    seconds.className="second";
    Idays.className="day";
    Ihours.className="hour";
    Iminutes.className="minute";
    Iseconds.className="second";

   if (sec<10){
       seconds=(":0"+sec);
    }

    days.append(day)
    hours.append(hour)
    minutes.append(min)
    seconds.append(sec)
    count.appendChild(dateDiv)
    hoursDiv.append(days,hours,minutes,seconds);
    count.append(infoHead,hoursDiv,infoFoot)
    

}
setInterval(digitalCountdown,100);
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
