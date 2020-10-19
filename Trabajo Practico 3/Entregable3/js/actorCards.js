"use strict";

let cards=document.getElementsByClassName("cardAct");
for (var i in cards){
    (function(i){
        cards[i].onmouseover = function(e){
            let img=this.getElementsByTagName('img')[0];
            let text=this.getElementsByTagName('div')[0];
            inActor3d(this,img,text,e)};
            cards[i].onmouseout =function(e){ 
                let img=this.getElementsByTagName('img')[0];
                let text=this.getElementsByTagName('div')[0];
                outActor3d(this,img,text,e)};
        })(i)
    }

    function inActor3d(act,img,text,e){
        console.log(act.style.width)
        act.style.transform="translate(2px,1px)"
        let xAct = (act.style.width  - e.offsetX )  / 11;
        let yAct = (act.style.height   - e.offsetY ) / 11;
        // img.style.transform = "rotateX("+(xAct)+"deg) rotateY("+(yAct)+"deg)";
        // text.style.transform = "rotateX("+(xAct)+"deg) rotateY("+(yAct)+"deg)";
            // img.style.transform = "rotate3d("+(xAct)+","+(yAct)+"1,12deg)";
            // img.style.transform = "rotate3d("+4+","+5+"1 , 12deg)";
        // img.style.transition = "none"
        // transform: rotate3d(1,0,0,60deg;   
    }
    
    function outActor3d(act,img,text,e){
        // act.style.transform="translate(-2px,-1px)"
        // img.style.transform = `rotateX(0deg) rotateY(0deg)`;
        // text.style.transform = `rotateX(0deg) rotateY(0deg)`;
        // // img.style.transition = "none"
        // act.style.transform="translate(1px,3px)"
}