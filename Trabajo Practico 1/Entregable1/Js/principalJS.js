"USE STRICT";
canvas=document.querySelector("#canvas")
let ctx = canvas.getContext("2d");
let canOriginalW=canvas.width;
let canOriginalH=canvas.height;
let canvasData = ctx.createImageData(canOriginalW,canOriginalH);

let inputImage= document.querySelector('#inputImage');
let imageData=canvasData;
let originalImageData=null;
let imageModify=canvasData;
/*function clickInput() {
    document.querySelector('#foto-input').click();
}
onclick="document.querySelector('#inputImage').click();"*/
//let lastImages=[]; arreglo de versiones previas
document.querySelector('#btnImage').addEventListener("click", function(){
    document.querySelector('#inputImage').click();
});
let lastImage=imageModify;
let lastDrawing=lastImage;
let btnRevertCambio=document.querySelector("#revert");
let btnRevertCambios=document.querySelector("#reverts");
btnRevertCambio.disabled=true;
btnRevertCambios.disabled=true;



//-------------------Lienzo-------------------------
let lienzo = document.querySelector('#inputLienzo');

document.querySelector('#btnLienzo').addEventListener("click",function(){
    lienzo.addEventListener("click", function(){
        canvas.hidden=false;
        if(originalImageData==null){
            btnRevertCambios.disabled=true;
            btnRevertCambio.disabled=true;
        }
        else{
            //Si deseo iniciar nuevamente desde el lienzo blanco
            //DEBERIA PERMITIR VOLVER A MI PROYECTO ANTERIOR?????????????????????????  
            btnRevertCambio.disabled=false;
        }
        saveOriginalImage()
        ctx.putImageData(originalImageData,0,0);
        imageData = canvasData;
    })
    lienzo.click();
    pinceles.hidden=false;
    document.querySelector("#alertImg").hidden=true;
})

//------------------------------------Dibujo
//--Tamaño pincel--
/*    

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
    let sizePincel = 1;
//---control de acciones---
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
    })
    
    let pinceles=document.querySelector("#pinceles");
    pinceles.addEventListener("click",function(){
        herramienta=this.value;
    });
    
    //------Dibujo--------
    let pxInput=document.querySelector("#pincelPX");
    pxInput.addEventListener("change", function(){
        sizePincel = pxInput.value;
    })
    canvas.addEventListener("mousemove", function(e) {
        if(accion){
            lastDrawing=ctx.getImageData(0, 0, canvas.width, canvas.height);
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

    function drawWithSize(horiz,vert,r, g, b,a) {
        let distance = sizePincel - 1;
        for(let x = horiz - distance; x <= horiz + distance; x ++) {
            for(let y = vert - distance; y <= vert + distance; y ++) {
                setPixel(imageData,x,y,r, g, b,a);
            }
        }
    }
    
    function dibujarPixel(x,y){
        if(herramienta !="borrador"){
            if(sizePincel==1){
                setPixel(imageData,x,y,0,0,0,255)
            }else{
                drawWithSize(x,y,0,0,0,255)
            }            
        }else{
            if(sizePincel==1){
                setPixel(imageData,x,y,255,255,255,255)
            }else{
                console.log("enaneaer")
                drawWithSize(x,y,255,255,255,255)
            }            
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






//-------------------------------Image-----------------------------------------     

//---Charge---

inputImage.onchange = e => {
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
                let arrWxH= adaptCanvasTo(this)
                let imageScaledWidth=arrWxH[0];
                let imageScaledHeight=arrWxH[1];
                // draw image on canvas
                canvasData=ctx.createImageData(imageScaledWidth , imageScaledHeight)
                ctx.drawImage(image,0,0, imageScaledWidth, imageScaledHeight);
                imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                // get imageData from content of canvas
                if(originalImageData==null){
                    btnRevertCambio.disabled=true;
                    originalImageData = imageData;
                    imageModify=originalImageData;
                }
                else{
                    console.log("entro a la false")
                    btnRevertCambio.disabled=false;
                    imageModify=imageData
                }
                saveOriginalImage()
                ctx.putImageData(imageData,0,0);
                //lienzo.hidden=true;
                pinceles.hidden=false;
            }
            lastImage=ctx.getImageData(0, 0, canvas.width, canvas.height);
            document.querySelector("#alertImg").hidden=true; 
        }
    }else{
        document.querySelector("#alertImg").hidden=false
    }
    inputImage.value=null;
    console.log(originalImageData);
}

    function adaptCanvasTo(picture){
        let arr=[];
        let imageAspectRatio;
        let imageScaledWidth;
        let imageScaledHeight;
        if( picture.width > picture.height){
            imageAspectRatio = (1.0 * picture.height) / picture.width;
            imageScaledWidth = canOriginalW;
            imageScaledHeight = canOriginalH * imageAspectRatio;
        }else{
            imageAspectRatio =(1.0 * picture.width) / picture.height
            imageScaledWidth=canOriginalW * imageAspectRatio 
            imageScaledHeight=canOriginalH;                    
        }
        arr.push(imageScaledWidth);
        arr.push(imageScaledHeight);
        canvas.width=imageScaledWidth ;
        canvas.height=imageScaledHeight;
        console.log("printing")        
        return arr;
    }

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
    document.querySelector("#download").addEventListener("click",function(){
        downloadImage.click();
    })

    downloadImage.addEventListener("click", download);
    function download() {
        downloadImage.href = canvas.toDataURL();
        downloadImage.download = "myProyect.png";
    }

//---Delete---
let cleanCanvas = document.querySelector('#deleteImage');
document.querySelector("#clean").addEventListener("click",function(){
    cleanCanvas.click();
})
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
document.querySelector("#revert").addEventListener("click",function(){
    revert.click()
})

revert.addEventListener("click",function(){
    if(lastImage!=canvasData){
        let arr= adaptCanvasTo(lastImage)
        canvas.width=arr[0];
        canvas.height=arr[1];
        ctx.putImageData(lastImage, 0, 0);
        
        imageData=lastImage;
        btnRevertCambio.disabled=true;
        console.log("lastImage")
    }else{
        console.log("imageData")
        ctx.putImageData(imageData, 0, 0);
        btnRevertCambio.disabled=true;
    }
})

/* let revertDraw=document.querySelector("#oldDraw");
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
 */
//--Reiniciar Proyecto
let reiniciar=document.querySelector("#OriginalImage");
btnRevertCambios.addEventListener("click",function(){
    reiniciar.click()
})

reiniciar.addEventListener("click",function(){
    let arr= adaptCanvasTo(lastImage)
    canvas.width=arr[0];
    canvas.height=arr[1];
    resetImage();
    btnRevertCambio.disabled=false;
    btnRevertCambios.disabled=true;
    console.log(originalImageData);
})

function saveOriginalImage() {
    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } 

function resetImage() {
    ctx.putImageData(originalImageData, 0, 0);
}

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
else if(filters.value== "fGscale"){
    for (let i = 0; i < data.length; i += 4) {
        let grayscale = getRed(i) * .3 + getGreen(i) * .59 + getBlue(i) * .11;
        data[i+0] = grayscale;    // r
        data[i+1] = grayscale;    // g
        data[i+2] = grayscale;    // b
    }
    ctx.putImageData(image,0,0)
}
else if(filters.value=="fSat"){
    let r=0, g=0, b=0, a=0;
    for(let i = 0; i<canvas.width-1; i++){
        for(let j = 0; j<canvas.height; j++){
                let ind = (i + j * image.width) * 4
                r =data[ind]/255
                g = data[ind+1]/255
                b = data[ind+2]/255
                let cmax = Math.max(r,g,b)
                let cmin = Math.min(r,g,b)
                let delta = cmax-cmin
                let hue = getHue(delta,cmax,r,g,b)
                let light = getLight(cmax,cmin)
                let sat = getSaturacion(light,delta) + 0.3
                let c = getC(sat,light)
                let x = getX(hue,c)
                let m = light - (c/2)
                let arrNewRGB = getNewRGB(hue,c,x)
                r = arrNewRGB[0];
                g = arrNewRGB[1];
                b = arrNewRGB[2];
                let newRed = (r+m)*255
                let newGreen = (g+m)*255
                let newBlue = (b+m)*255
                setPixel(image,i,j,newRed,newGreen,newBlue,255)
            }
        }
        ctx.putImageData(image,0,0)
    }
    btnRevertCambio.disabled=false;
    btnRevertCambios.disabled=false;
    console.log(originalImageData);
})
//---saturacion methods---

    function getNewRGB(hue,c,x){
        if(hue>=0 && hue<60){
            return [c,x,0]
        }else if (hue>=60 && hue<120){
            return [x,c,0]
        }else if (hue>=120 && hue <180){
            return [0,c,x]
        }else if (hue>=180 && hue<240){
            return [0,x,c]
        }else if (hue>=240 && hue<300){
            return [x,0,c]
        }else{
            return [c,0,x]
        }
    }

    function getX(hue, c){
        let aux = ((hue / 60) % 2) - 1
        if (aux<0){
            aux = aux*-1
        }
        return c * (1 - aux)
    }


    function getC(sat,light){
        let aux = 2*light - 1
        if (aux<0){
            aux = aux* -1
        }
        return (1 - aux) * sat
    }

    function getSaturacion(light,delta){
        if (delta==0){
            return 0
        }else{
            let aux = (2*light)-1
            if (aux<0){
                aux = aux * -1
            }
            return delta/(1-((2*light)-1))
        }
    }

    function getLight(cmax,cmin){
        return (cmax + cmin) / 2
    }

    function getHue(delta,cmax,r,g,b){
        if (delta==0){
            return 0
        }else if (cmax==r){
            return Math.floor(60*(((g-b)/delta)%6))
        }else if(cmax==g){
            return Math.floor(60*(((b-r)/delta)+2))
        }else{
            return Math.floor(60*(((r-g)/delta)+4))
        }
    }
//---DataMatriz Methods

    function getRed(x){
        return  imageData.data[x];
    }

    function getGreen(x){
        return imageData.data[x +1];
    }

    function getBlue(x){
        return imageData.data[x +2];
    }
    
    function getAlpha(x){
        return imageData.data[x +3];
    }

    function setPixel(d, x, y, r, g, b, a) {
        let  i = (x + y * d.width) * 4;
        d.data[i + 0] = r;
        d.data[i + 1] = g;
        d.data[i + 2] = b;
        d.data[i + 3] = a;
    }