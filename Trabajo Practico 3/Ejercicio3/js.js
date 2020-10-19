cvs=document.querySelector("#canvas");
let ctx=cvs.getContext("2d");
let w=cvs.width
let h=cvs.height

let cX=w/2;
let cY=h/2;
color=0;
let agujaH
let agujaM
let agujaS=w/4;

document.querySelector("#color-picker").addEventListener("change",function(){
    color=document.querySelector("#color-picker").value;
    cvs.hidden=false
});

setInterval(reDraw(),1000);

function reDraw(){
    ctx.fillStyle=color;
    ctx.arc(cX,cY,w/2, 0, 2 * Math.PI, true);
    ctx.fill();
    let hour=new Date()

    ctx.beginPath()
    ctx.moveTo(cX,cY);
    ctx.strokeStyle="red"
    let ang=(hour.getSeconds()*2/ Math.PI - Math.PI/2);
    let sX= cX * Math.cos(ang)*agujaS/2
    let sY= cY * Math.cos(ang)*agujaS/2
    ctx.fillStyle="black"
    ctx.lineTo(sX,sY);
    ctx.fill()
    ctx.stroke
    ctx.closePath()
    
    ctx.beginPath()
    ctx.moveTo(cX,cY);
    ang=(hour.getMinutes()/60)*2/ Math.PI - Math.PI/2
    let mX=cX * Math.cos(ang)*agujaM
    let mY=cY * Math.cos(ang)*agujaM
    ctx.fillStyle="black"
    ctx.lineTo(mX,mY);
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    
    ctx.beginPath()
    ctx.moveTo(cX,cY);
    ang=(hour.getHours()/12)*2/ Math.PI - Math.PI/2
    let hX=cX * Math.cos(ang)*agujaH
    let hY=cY * Math.cos(ang)*agujaH
    ctx.fillStyle="black"
    ctx.lineTo(hX,hY);
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}

function drawHand(pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(cX,cY);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}