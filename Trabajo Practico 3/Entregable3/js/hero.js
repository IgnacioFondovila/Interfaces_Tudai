/*svgElement=document.querySelector("#svgElement");
svgRect=document.querySelector("#svgRect");
<svg hidden id="svgElement" width="100" height="100" viewBox="41 54 106 122">
    <rect  id="svgRect" width="100" height="100" style="fill:rgb(0,0,255);" />    
</svg>
    this.backImg.setAttribute("width", this.getWidth());
    this.backImg.setAttribute("height", this.getHeight());
*/
let bk=document.querySelector("#bkImage");
let c1=document.querySelector("#c1");
let c2=document.querySelector("#c2");
let c3=document.querySelector("#c3");
let car = document.querySelector("#carImage");
let cards = document.querySelector('.centralCards');
let yfixed=200;
window.onscroll=function(e){scrollCar(e),scrollCards(e)}


function scrollCar(e){
    if(yfixed<1042){
        altFixed=yfixed
        yfixed=window.scrollY;
        // c1.style.marginTop=" " +(yfixed) + "px";
        console.log("si");
        car.style.marginTop=" " +(yfixed) + "px";
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
    if(altFixed<1042){
        if(yfixed>200&&yfixed<300){
            if(lastFixed<yfixed){
                c1.style.animation="ampliateCard"
            }else{
                c1.style.animation="reduceCard"
            }
        }
        cards.style.top=yfixed-100+"px"
        // cards.style.marginTop=""+(altFixed*1.2)+"px";
        // cards.style.transform="translateY("+(altFixed)+"px)";
    }
}
///////////////////ACORDEON///////////////////////
// let shower=document.querySelector(".showEvent");
let btnsAccordeon=document.querySelector(".accordeon").getElementsByTagName("button")
let lastBtn;
for(let i=0;i<btnsAccordeon.length;i++){
    btnsAccordeon[i].addEventListener("click",function(){seeEvents(i)})
}

function seeEvents(i){
    lastBtn=i
    let shower=btnsAccordeon[i].nextElementSibling;
    // shower.style.animation= "ampliateCard 1s linear"
    shower.hidden=false;
    shower.classList.toggle("showEvent",false)
    shower.classList.toggle("displayEvent")
    /////como hacer para llamar a una funcion cuendo se deja de hacer focus en un btn
    btnsAccordeon[i].onmousedown=function(){
        btnsAccordeon[i].removeEventListener("click",function(){seeEvents(i)    });
        hideEvents(i)
    };
}
function hideEvents(i){
    let shower=btnsAccordeon[lastBtn].nextElementSibling;
    shower.hidden=true;
    shower.classList.toggle("showEvent")
    shower.classList.toggle("displayEvent",false)
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