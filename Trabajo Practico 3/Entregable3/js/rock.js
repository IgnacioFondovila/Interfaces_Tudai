let rockers = document.getElementsByClassName('move');
for (var i in rockers){
    (function(i){
        rockers[i].onmouseover = function(){
            let prom=this.getElementsByTagName('audio')[0].play();
            if (prom != undefined) {
            prom.then(_ => {
            
            }).catch(error => {
            });
        }
        this.style.transform="translate(5px,5px)"
    }
    rockers[i].onmouseout = function(){
        let prom=this.getElementsByTagName('audio')[0];
        prom.pause(); 
        prom.currentTime = 0
        this.style.transform="translate(-5px,-5px)"
    }
})(i)
}

let forms = document.querySelectorAll('.formulary');
for(let i=0;i<forms.length;i++){
    let formsInputL = forms[i].getElementsByClassName("lefts");
    let formsInputR = forms[i].getElementsByClassName("rights");
    forms[i].style.animation=" insertForms 5s linear"
    for(let i=0;i<formsInputL.length;i++){
        formsInputL[i].style.animation="insertInputsLeft 6s linear"
    }
    for(let i=0;i<formsInputR.length;i++){
        formsInputR[i].style.animation="insertInputsRight 6s linear"
    }
}


// unmuteButton.addEventListener('click', function() {
//     video.muted = false;
//   });