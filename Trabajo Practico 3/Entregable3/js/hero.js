/*svgElement=document.querySelector("#svgElement");
svgRect=document.querySelector("#svgRect");
<svg hidden id="svgElement" width="100" height="100" viewBox="41 54 106 122">
    <rect  id="svgRect" width="100" height="100" style="fill:rgb(0,0,255);" />    
</svg>
    this.backImg.setAttribute("width", this.getWidth());
    this.backImg.setAttribute("height", this.getHeight());
*/
let bk=document.querySelector("#bkImage");
let fr=document.querySelector("#frImage");
let car = document.querySelector("#carImage");
let cards = document.querySelector('.centralCards');
let cardsB = document.querySelectorAll('.card-body');
let yfixed=100;

let accordeon=document.querySelector(".accordeon")

window.onscroll=function(e){scrollCar(e),scrollCards(e)}
// window.scrollY=0;

function scrollCar(e){
    if(yfixed<1042){
        altFixed=yfixed
        yfixed=window.scrollY;
        // c1.style.marginTop=" " +(yfixed) + "px";
        console.log(yfixed);
        car.style.marginTop=" " +(yfixed) + "px";
        fr.style.marginTop=" " +(yfixed) + "px";
        car.style.transform="translateX("+(yfixed)+"px)";
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
    }else if(yfixed>1180){
        accordeon.hidden=false 
        // accordeon.style.animation= "cubic-bezier(0.175, 0.885, 0.32, 1.275) 2s";
        accordeon.style.animation="show 1s"
    }
}
///////////////////ACORDEON///////////////////////

// let shower=document.querySelector(".showEvent");
let btnsAccordeon=document.querySelector(".accordeon").getElementsByTagName("button")
let divAccordeon=document.querySelectorAll(".divEvents")
// let lastBtn;
const amount = 50;
for(let i=0;i<btnsAccordeon.length;i++){
    
    btnsAccordeon[i].addEventListener("click",function(){seeEvents(i)})
    let img=divAccordeon[i].getElementsByTagName("img")[0]
    img.onmousemove=event => {
        let mouseX = event.clientX
        let mouseY = event.clientY;
        let cRect= img.getBoundingClientRect();
        // const centerX = rect.left + (rect.right - rect.left) * 0.5;
        // const centerY = rect.top + (rect.bottom - rect.top) * 0.5;
        const auxX =  (cRect.right - cRect.left*2.2) - mouseX;
        // const yRotation = 2 * ((xVal - width / 2) / width
        const auxY = (cRect.bottom  - cRect.top) - mouseY;
        const xDeg = auxX / amount * -4
        const yDeg = auxY / amount * -4
        img.style.transform = `rotate3d(1, 0, 0, ${yDeg}deg) rotate3d(0, 1, 0, ${xDeg}deg)`;
    }     
    img.onmouseleave=event => {
        img.style.transform = `rotate3d(1, 0, 0, 0deg) rotate3d(0, 1, 0, 0deg)`;
    }
}
/*
const handleMouseMove = event => {
    const mousePosX = event.clientX
    const mousePosY = event.clientY;

    imgs.forEach(thing => {
        const thingRect = thing.getBoundingClientRect();

        const centerX = thingRect.left + (thingRect.right - thingRect.left) * 0.5;
        const centerY = thingRect.top + (thingRect.bottom - thingRect.top) * 0.5;
        const distX = centerX - mousePosX;
        const distY = centerY - mousePosY;
        const xDeg = distX / amount * -3;
        const yDeg = distY / amount * -3;
        thing.style.transform = `rotate3d(1, 0, 0, ${yDeg}deg) rotate3d(0, 1, 0, ${xDeg}deg)`;

    });
}; */

// window.addEventListener("mousemove", generateEffect(handleMouseMove)); 
function seeEvents(i){   
    for(let j=0;j<btnsAccordeon.length;j++){
        hideEvents(j)
    }// lastBtn=i
    let shower=btnsAccordeon[i].nextElementSibling;

    shower.hidden=false;

    shower.className="showEvent divEvents"
    shower.classList.remove("displayEvent")
    /////como hacer para llamar a una funcion cuendo se deja de hacer focus en un btn
    btnsAccordeon[i].onmousedown=function(){
        btnsAccordeon[i].removeEventListener("click",function(){seeEvents(i)});
    };
}

function hideEvents(i){
    let shower=btnsAccordeon[i].nextElementSibling;
    shower.classList.remove("showEvent")
    shower.classList.add("displayEvent")
    
    shower.hidden=true

    btnsAccordeon[i].onmousedown=function(){
        btnsAccordeon[i].addEventListener("click",function(){seeEvents(i)});
    };
}

    // let a=pages.getElementsByTagName('a');
    // for(let i in a){
    //     (function(i){
    //         a[i].style.transition="max-height: 100vh"  
    // })
    
    // pages.hidden=false;
    // btnBurg.removeEventListener("onmouseleave",reduceCard);
    
//     car.style.transform="translateY("+(window.sc)+"px)";
// }
// window.onscroll=function(){
//     if(window.scrollY >10 && window.scrollY <1000){
//         let y =window.scrollY;
//         car.style.transform="translateY("+(y*2)+"px)";
//         // car.style.transform="translate("+(y)+"px,"+(yfixed)+"px)";
//         // car.style.transform="translate("+(y)+"px,"+(yfixed)+"px)";
//         car.style.animation="moveCar 1s"
//         // car.getElementsByClassName.animation="moveCar 1s";
//         console.log("fue1");    
//     }else if(window.scrollY >90&& window.scrollY <100 ){
//         console.log("fue2");   
//     }else if(window.scrollY >120){
//         let hero=document.querySelector(".hero");
//         hero.style.postion="relative"
//         console.log(window.scrollY)
//     }
// }


// let logo=document.querySelector(".home");
// let d=document.getElementById("burger");
// d.style.transform="";

//    let lis= document.querySelectorAll('li.li');
//    for (let i = 0; i < lis.length; i++) {  
//        lis[i].onmouseleave=function(){adjustStyle(i)}
//    }
       
//    function adjustStyle(i){
//        lis[i].style.transform = " transition: ease-in 5s;";
//     }
    
    // if (lis[i].style.transform()){
        //     lis[i].style.visibility = "visible";
        // }else {
            //     lis[i].style.visibility = "hidden";
            // }

         // function adjustStyle(i) {
         //     lis[i].setAttribute
             
         // }