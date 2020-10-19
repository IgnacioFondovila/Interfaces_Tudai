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

// unmuteButton.addEventListener('click', function() {
//     video.muted = false;
//   });