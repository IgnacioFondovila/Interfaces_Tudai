///////////////////ACORDEON///////////////////////
// let shower=document.querySelector(".showEvent");
let btnsAccordeon=document.querySelector(".accordeon").getElementsByTagName("button")
let divAccordeon=document.querySelectorAll(".divEvents")
let accordeon=document.querySelector(".accordeon")
// let lastBtn;
const amount = 50;
for(let i=0;i<btnsAccordeon.length;i++){
    
    btnsAccordeon[i].addEventListener("click",function(){seeEvents(i)})
    btnsAccordeon[i].style.animation="insertAccordeon linear 6.5s"
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

// let divAct=document.querySelectorAll(".cardAct")
// // let lastBtn;
// const amount = 90;
// for(let i=0;i<divAct.length;i++){
//     let img=divAct[i].getElementsByTagName("img")[0]
//     img.onmousemove=event => {
//         let mouseX = event.clientX
//         let mouseY = event.clientY;
//         let cRect= img.getBoundingClientRect();
//         // const centerX = rect.left + (rect.right - rect.left) * 0.5;
//         // const centerY = rect.top + (rect.bottom - rect.top) * 0.5;
//         const auxX =  (cRect.right - cRect.left*2.2) - mouseX;
//         // const yRotation = 2 * ((xVal - width / 2) / width
//         const auxY = (cRect.bottom  - cRect.top) - mouseY;
//         const xDeg = auxX / amount * -4
//         const yDeg = auxY / amount * -4
//         img.style.transform = `rotate3d(1, 0, 0, ${yDeg}deg) rotate3d(0, 1, 0, ${xDeg}deg)`;
//     }     
//     img.onmouseleave=event => {
//         img.style.transform = `rotate3d(1, 0, 0, 0deg) rotate3d(0, 1, 0, 0deg)`;
//     }
// }
// let cards=document.getElementsByClassName("cardAct");
// for (var i in cards){
//     (function(i){
//         cards[i].onmouseover = function(e){
//             let img=this.getElementsByTagName('img')[0];
//             let text=this.getElementsByTagName('div')[0];
//             inActor3d(this,img,text,e)};
//             cards[i].onmouseout =function(e){ 
//                 let img=this.getElementsByTagName('img')[0];
//                 let text=this.getElementsByTagName('div')[0];
//                 outActor3d(this,img,text,e)};
//         })(i)
//     }

//     function inActor3d(act,img,text,e){
//         console.log(act.style.width)
//         act.style.transform="translate(2px,1px)"
//         let xAct = (act.style.width  - e.offsetX )  / 11;
//         let yAct = (act.style.height   - e.offsetY ) / 11;
//         // img.style.transform = "rotateX("+(xAct)+"deg) rotateY("+(yAct)+"deg)";
//         // text.style.transform = "rotateX("+(xAct)+"deg) rotateY("+(yAct)+"deg)";
//             // img.style.transform = "rotate3d("+(xAct)+","+(yAct)+"1,12deg)";
//             // img.style.transform = "rotate3d("+4+","+5+"1 , 12deg)";
//         // img.style.transition = "none"
//         // transform: rotate3d(1,0,0,60deg;   
//     }
    
//     function outActor3d(act,img,text,e){
//         // act.style.transform="translate(-2px,-1px)"
//         // img.style.transform = `rotateX(0deg) rotateY(0deg)`;
//         // text.style.transform = `rotateX(0deg) rotateY(0deg)`;
//         // // img.style.transition = "none"
//         // act.style.transform="translate(1px,3px)"
// }