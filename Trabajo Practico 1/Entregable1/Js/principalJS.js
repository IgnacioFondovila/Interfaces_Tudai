"USE STRICT";
canvas=document.querySelector("#canvas")
let ctx = canvas.getContext("2d");
let canvasData = ctx.createImageData(canvas.width, canvas.height);

let input = document.querySelector('#inputImage');
let imageData=canvasData;
var originalImageData=null;
let imageModify=canvasData;
//let lastImages=[]; arreglo de versiones previas
let lastImage=imageModify;
let lastDrawing=lastImage;

let btnRevertCambio=document.querySelector(".btn");
let btnRevertCambios=document.querySelector(".btns");
btnRevertCambio.disabled=true;
btnRevertCambios.disabled=true;

//------------------------------------Dibujo
//--Tamaño pincel--
/*let sizePincel = 1;
    let p=sizePincel;
     
pxInput=document.querySelector("#pincelPX");
    pxInput.addEventListener("change", function(){
        sizePincel = pxInput.value;
        p=sizePincel;
        console.log(p);
    })
    
    function agrandarPincel(x,y,tam){
        console.log(tam);
        let localX = x;
        let localY = y;
        for (let i = 0; i<tam; i++){
            localX++;
            localY = y;
            dibujarPixel(imageData,localX,localY);
            for (let j = 0; j<tam; j++){
                localY++;
                dibujarPixel(imageData,localX,localY);
            }
            localY = y;
            for (let k = 0; k>tam; k++){
                localY--;
                dibujarPixel(imageData,localX,localY);
            }
        }
        localX = x;
        for (let i = 0; i>tam; i--){
            localX++;
            localY = y
            dibujarPixel(imageData,localX,localY);
            for (let j = 0; j<tam; j++){
                dibujarPixel(imageData,localX,localY);
            }
            localY = y
            for (let k = 0; k>tam; k++){
                dibujarPixel(imageData,localX,localY);
            }
        }
        
    }
    agrandarPincel(calcularX(i,lastX,lastY,x,y),i,p-1)*/
    let herramienta; 
    let accion = false;
    let havePuntos = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener("mousedown", function() {
        accion = true;
    });   
    
    canvas.addEventListener("mouseup", function() {
        accion = false;
        havePuntos = false;
    });

    canvas.addEventListener("mouseleave",function(){
        accion = false;
        havePuntos = false;
        console.log("mouseleave");
    })
    
    pincelesInput=document.querySelector("#pinceles");
    pincelesInput.addEventListener("change", function(){
        herramienta = pincelesInput.value;
    })
    
//Dibujo
    canvas.addEventListener("mousemove", function(e) {
        if(accion){
            lastImage=ctx.getImageData(0, 0, canvas.width, canvas.height);
            let x = e.pageX - this.offsetLeft;
            let y = e.pageY - this.offsetTop;
            dibujarPixel(imageData,x,y);
            chequeoPuntos(x,y)
            //lastDrawing=imageData;
            ctx.putImageData(imageData,0,0);
        }
    });
    
    function chequeoPuntos(x,y){
        //si no dibuje anteriormente declaro mis nuevos puntos
        //si tengo puntos los uno con los actuales
        if (!havePuntos){
            lastX = x;
            lastY = y;
            havePuntos = true;
        }else{
            hacerLinea(lastX,lastY,x,y)
            lastX = x;
            lastY = y;
        }
    }

    function dibujarPixel(x,y){
        if(herramienta=="pincel"){
            setPixel(imageData,x,y,0,0,0,255)
        }else{
            setPixel(imageData,x,y,255,255,255,255)
        }
    }
 
    function hacerLinea(lastX,lastY,x,y) {
        if (lastX<x){
            for (let i = lastX; i<x; i++){
                dibujarPixel(i,calcularY(i,lastX,lastY,x,y));
            }
        }else{
            for (let i = lastX; i>x; i--){
                dibujarPixel(i,calcularY(i,lastX,lastY,x,y));
            }
        }
        if (lastY<y){
            for (let i = lastY; i<y; i++){
                dibujarPixel(calcularX(i,lastX,lastY,x,y),i);
            }
        }else{
            for (let i = lastY; i>y; i--){
                dibujarPixel(calcularX(i,lastX,lastY,x,y),i);
            }
        }
    }

    function calcularX(i,lastX,lastY,x,y){
        return Math.floor(((i-lastY)/(y-lastY))*(x-lastX)+lastX);
    }

    function calcularY(i,lastX,lastY,x,y){
        return Math.floor(((i-lastX)/(x-lastX))*(y-lastY)+lastY);
    }







//--Lienzo--
let lienzo = document.querySelector('#inputLienzo').addEventListener("click", function(){
    canvas.hidden=false;
    originalImageData = canvasData;
})


//--Image--     

//---Charge---

//No puedo cargar otra vez la misma imagen

input.onchange = e => {
    let file = e.target.files[0];
    canvas.hidden=false;
    if(areImg(file)){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = readerEvent => {
            let content = readerEvent.target.result; // this is the content! 
            let image = new Image();
            //image.crossOrigin = 'Anonymous';
            image.src = content;
            
            image.onload = function () {
                let imageAspectRatio;
                let imageScaledWidth;
                let imageScaledHeight;
                if( this.width > this.height){
                     imageAspectRatio = (1.0 * this.height) / this.width;
                     imageScaledWidth = canvas.width;
                     imageScaledHeight = canvas.height * imageAspectRatio;
                    }else{
                        imageAspectRatio =(1.0 * this.width) / this.height
                        imageScaledWidth=canvas.width * imageAspectRatio 
                        imageScaledHeight=canvas.height;                    
                    }
                    canvasData=ctx.createImageData(imageScaledWidth, imageScaledHeight)
                    canvas.width=imageScaledWidth ;
                    canvas.height=imageScaledHeight;
                    /*  let imageAspectRatio = (1.0 * this.height) / this.width;
                    let imageScaledWidth = canWidth;
                    let imageScaledHeight = canHeight * imageAspectRatio; */
                    // draw image on canvas
                ctx.drawImage(this,0,0, imageScaledWidth, imageScaledHeight);
                
                // get imageData from content of canvas
                imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                originalImageData = imageData;
                ctx.putImageData(imageData,0,0);
                btnRevertCambios.disabled=false;
            }
        }
    }else{
        alert("El formato del archivo que trata de utilizar no es valido");
    }
}
input = document.querySelector('#inputImage');

function areImg(imagen){
    isImg=true;
    let imgType=imagen['type'];
    if(imgType == 'image/jpeg' || imgType == 'image/jpg' || imgType =='image/png') {
        isImg=true;
    }else{
        isImg=false;
    }
    return isImg;
}

//---Dowload

let downloadImage = document.querySelector("#downloadImage");
downloadImage.addEventListener("click", download);
function download() {
    downloadImage.href = canvas.toDataURL();
    downloadImage.download = "myProyect.png";
}

//---Delete---

let cleanCanvas = document.querySelector('#deleteImage');
cleanCanvas.addEventListener("click", function() {
    lastImage=ctx.getImageData(0, 0, canvas.width, canvas.height);
    iData=ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(let x = 0; x < canvas.width ; x++) {
        for(let y = 0; y < canvas.height; y++) {
            setPixel(iData , x , y , 255, 255, 255,255);
        }
    }
    ctx.putImageData(iData, 0, 0);
    imageData=iData;
    btnRevertCambio.disabled=false;
})

//--Revertir cambio

let revert=document.querySelector("#oldImage");
revert.addEventListener("click",function(){
    if(lastImage!=canvasData){
        ctx.putImageData(lastImage, 0, 0);
        imageData=lastImage;
        btnRevertCambio.disabled=true;
    }else{
        ctx.putImageData(imageData, 0, 0);
        btnRevertCambio.disabled=true;
    }
})

let revertDraw=document.querySelector("#oldDraw");
revertDraw.addEventListener("click",function(){
    if(lastImage!=lastDrawing){
        ctx.putImageData(lastDrawing, 0, 0);
        imageData=lastImage;
        btnRevertCambio.disabled=true;
    }else{
        ctx.putImageData(imageData, 0, 0);
        btnRevertCambio.disabled=true;
    }
})

//--Reiniciar Proyecto
let reiniciar=document.querySelector("#OriginalImage");
reiniciar.addEventListener("click",function(){
    ctx.putImageData(originalImageData, 0, 0);
    btnRevertCambio.disabled=false;
    btnRevertCambios.disabled=true;
})

    //---Filters---

let filters=document.querySelector("#filterSelector");
filters.addEventListener("change",function(){
    lastImage=ctx.getImageData(0, 0, canvas.width, canvas.height);
    let image=imageData;
    imageModify=image;
    let data=image.data;
    if(filters.value == "fNegativo"){
        for(let i = 0; i < data.length; i += 4){
            data[i + 0] = 255 - getRed(i);
            data[i + 1] = 255 - getGreen(i);
            data[i + 2] = 255 - getBlue(i);
        }
        ctx.putImageData(image,0,0)
        
    }
    else if(filters.value== "fBrillo"){
        console.log(filters.value + "=Brillo");
        
    }
    else if(filters.value== "fBinary"){
        let umbral = 50
        for(let i = 0; i < data.length; i += 4){
            let promedio = Math.floor((getRed(i)+getGreen(i)+getBlue(i))/3)
            if(promedio>umbral){
                data[i + 0] = 255 ;
                data[i + 1] = 255 ;
                data[i + 2] = 255 ;
            }else{
                data[i + 0] = 0 ;
                data[i + 1] = 0 ;
                data[i + 2] = 0 ;
            }
        }
        ctx.putImageData(image,0,0);
    }
    else if(filters.value== "fSepia"){
        for(let i = 0; i < data.length; i += 4){
            let promedio = Math.floor((getRed(i)+getGreen(i)+getBlue(i))/3)
            data[i+0]= Math.min(promedio+40,255)
            data[i+1]= Math.min(promedio+15,255)
            data[i+2]= Math.min(promedio,255)   
        }
        ctx.putImageData(image,0,0)
    }
    /*else if("fBlur"){
        let blurMat = [1/36, 1/36, 1/36,
            1/36, 1/36, 1/36,
            1/36, 1/36, 1/36,
            1/36, 1/36, 1/36,
            1/36, 1/36, 1/36,
            1/36, 1/36, 1/36,
            1/36, 1/36, 1/36,
            1/36, 1/36, 1/36,
            1/36, 1/36, 1/36,
            1/36, 1/36, 1/36,
            1/36, 1/36, 1/36,
            1/36, 1/36, 1/36 ]
        let prom = Math.round(Math.sqrt(blurMat.length));
        let halfProm = Math.floor(prom/2);
        let iw = image.width;
        console.log(iw);
        let ih = image.height;
        console.log(ih);
        let w = iw;
        let h = ih;
        let retImage = image;
        let returnData = data;
        console.log(returnData);//var output = Filters.createImageData(w, h);
      
        let alphaFac = false ? 1 : 0;
        for (let y=0; y<h; y++) {
            for (let x=0; x<w; x++) {
            let iY = y;
            let iX = x;
            let dstOff = (y*w+x)*4;
            let r=0, g=0, b=0, a=0;
            for (let cy=0; cy<prom; cy++) {
                for (let cx=0; cx<prom; cx++) {
                    let scy = iY + cy - halfProm;
                    let scx = iX + cx - halfProm;
                    if (scy >= 0 && scy < ih && scx >= 0 && scx < iw) {
                        let imgOff = (scy*iw+scx)*4;
                        let wt = blurMat[cy*prom+cx];
                        r += retImage[imgOff] * wt;
                        g += retImage[imgOff+1] * wt;
                        b += retImage[imgOff+2] * wt;
                        a += retImage[imgOff+3] * wt;
                    }
                }
            }
            returnData[dstOff] = r;
            returnData[dstOff+1] = g;
            returnData[dstOff+2] = b;
            returnData[dstOff+3] = a + alphaFac*(255-a);
            }
        }
        ctx.putImageData(image,0,0)
    }*/
    else{
        for (let i = 0; i < data.length; i += 4) {
            let grayscale = getRed(i) * .3 + getGreen(i) * .59 + getBlue(i) * .11;
            data[i+0] = grayscale;    // r
            data[i+1] = grayscale;    // g
            data[i+2] = grayscale;    // b
        }
        ctx.putImageData(image,0,0)
    }
    document.querySelector(".btn").disabled=false
    })
    
    function getRed(x){
        return  imageData.data[x];
    }

    function getGreen(x){
        return imageData.data[x +1];
    }

    function getBlue(x){
        return imageData.data[x +2];
    }
    
    function setPixel(d, x, y, r, g, b, a) {
        let  i = (x + y * d.width) * 4;
        d.data[i + 0] = r;
        d.data[i + 1] = g;
        d.data[i + 2] = b;
        d.data[i + 3] = a;
    }