"USE STRICT";
let ctx = document.querySelector("#canvas").getContext("2d");
let width = 400;
let height =400;
let maxPX=255;
let imageData = ctx.createImageData(width, height);

let r=0;
let g=0;
let b=0;
let a=255;
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        setPixel(imageData, x, y, r, g, b, a);
        if(x % height==0){//si llegue al final de la fila y recorri todas las columnas
            r+=(maxPX / (height-1) );
            g+=(maxPX / (height-1) );
            b+=(maxPX / (height-1) );//Voy hasta la altura menos una, ya que la primera fila es enteramente negra
        }
    }
}

ctx.putImageData(imageData,0,0);

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.height) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}