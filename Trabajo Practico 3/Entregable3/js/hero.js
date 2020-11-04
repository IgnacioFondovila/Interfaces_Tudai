/*svgElement=document.querySelector("#svgElement");
svgRect=document.querySelector("#svgRect");
<svg hidden id="svgElement" width="100" height="100" viewBox="41 54 106 122">
    <rect  id="svgRect" width="100" height="100" style="fill:rgb(0,0,255);" />    
</svg>
    this.backImg.setAttribute("width", this.getWidth());
    this.backImg.setAttribute("height", this.getHeight());
*/
"use strict";

let bk=document.querySelector("#bkImage");
let fr=document.querySelector("#frImage");
let acts=document.querySelector(".actors");
let insideImage=document.querySelector("#inImage");
let car = document.querySelector("#carImage");
let carrousel = document.querySelector(".carrous");
let cards = document.querySelector('.centralCards');
let cardsB = document.querySelectorAll('.card-body');
let titles = document.querySelectorAll('.titlesMove');
let yfixed=100;
let altFixed=100;

let amount=50
window.onscroll=function(e){scrollCar(e),scrollCards(e)}
// window.scrollY=0;
insideImage.onmousemove=event => {
    let mouseX = event.clientX
    let mouseY = event.clientY;
    let cRect= insideImage.getBoundingClientRect();
    // const centerX = rect.left + (rect.right - rect.left) * 0.5;
    // const centerY = rect.top + (rect.bottom - rect.top) * 0.5;
    const auxX =  (cRect.right - cRect.left*1.5) - mouseX;
    // const yRotation = 2 * ((xVal - width / 2) / width
    const auxY = (cRect.bottom  - cRect.top) - mouseY;
    const xDeg = auxX / amount * -3
    const yDeg = auxY / amount * -2
    insideImage.style.transform = `rotate3d(1, 0, 0, ${yDeg}deg) rotate3d(0, 1, 0, ${xDeg}deg)`;
}     
insideImage.onmouseleave=event => {
    insideImage.style.transform = `rotate3d(1, 0, 0, 0deg) rotate3d(0, 1, 0, 0deg)`;
}

function scrollCar(e){
    if(yfixed<1042){
        altFixed=yfixed
        yfixed=window.scrollY;
        // c1.style.marginTop=" " +(yfixed) + "px";
        console.log(yfixed);
        car.style.marginTop=" " +(yfixed) + "px";
        fr.style.marginTop=" " +(yfixed) + "px";
        insideImage.style.marginTop=" " +(yfixed) + "px";
        car.style.transform="translateX("+(yfixed)+"px)";
        fr.style.backgroundPositionX=(-yfixed)+"px";
    }else{
        yfixed=window.scrollY;
    }
}

function scrollCards(e){
    let lastFixed=altFixed;
    altFixed=yfixed;
    // cards.style.marginTop=""+(altFixed)+"px";
    // for (let i in cards){
    if(altFixed>=1 && altFixed<1042){
            cards.hidden=false;
        if(yfixed>150&&yfixed<500){
            if(lastFixed<yfixed){
                cardsB[0].className="card-body-ampliate"
            }else{
                cardsB[1].className="card-body-reduce"
            }
        }else if(yfixed>=500&&yfixed<700){
            cards.hidden=false;
            if(lastFixed<yfixed){
                cardsB[1].className="card-body-ampliate"
            }else{
                cardsB[2].className="card-body-reduce"
            }
        }else if(yfixed>=700&&yfixed<900){
            cards.hidden=false;
            if(lastFixed<yfixed){
                cardsB[2].className="card-body-ampliate"
            }
        }else if(yfixed<200){
            cardsB[0].className="card-body-reduce"
        }
        cards.style.top=yfixed-100+"px"
        // cards.style.marginTop=""+(altFixed*1.2)+"px";
        // cards.style.transform="translateY("+(altFixed)+"px)";
    }else if(altFixed<1){
        cards.hidden=true;
    }else if(yfixed>1180 && yfixed<1300 ){
        titles[0].hidden=false;
        titles[0].style.animation="insertTitle 1s"
        
        acts.style.animation="insertCards 2s"
        
        // accordeon.style.animation= "cubic-bezier(0.175, 0.885, 0.32, 1.275) 2s";
    }else if(yfixed>1800){
        titles[1].hidden=false;
        titles[1].style.animation="insertTitle 1s"

        carrousel.hidden=false;
        carrousel.style.animation="insertCarrousel 7s"

    }
}

let carrous = document.querySelector(".carrousel");
let arrowL = document.querySelector(".arrowLeft");
let arrowR = document.querySelector(".arrowRight");

carrous.onmousemove=function(){
    arrowL.hidden=false
    arrowR.hidden=false
}

carrous.onmouseleave=function(){
    arrowL.hidden=true
    arrowR.hidden=true
}

let index=0
slideScenes()

arrowL.onmouseup=function(){
    index=index-2
    slideScenes()
}
arrowR.onmouseup=function(){
    index=index
    slideScenes()
}


function slideScenes(){
    let scenes=document.querySelectorAll(".scene")
    let slides=document.querySelectorAll(".slideIndx")
    for (let i = 0; i < scenes.length; i++) {
        scenes[i].style.display = "none";
      }
    index++;
    if (index > slides.length) {
        index = 1
    }    
    if (index < 1) {
        index = slides.length
    }    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("ubicActiva")
    }
    scenes[index-1].style.display = "block"; 
    slides[index-1].className += " ubicActiva";
}
setInterval(slideScenes, 5000);



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
    Idays.className="iday";
    Ihours.className="ihour";
    Iminutes.className="iminute";
    Iseconds.className="isecond";

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
