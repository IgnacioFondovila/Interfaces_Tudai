"use strict";

let index=0
slideScenes()

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
    for (let i = 0; i < slides.length; i++) {
        slides[i].className.replace(" ubicActiva", "");
    }
    scenes[index-1].style.display = "block"; 
    slides[index-1].className += " ubicActiva";
    setTimeout(slideScenes, 3000);
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