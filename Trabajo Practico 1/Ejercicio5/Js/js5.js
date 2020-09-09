"USE STRICT";
let ctx = document.querySelector("#canvas").getContext("2d");
let width = 400;
let height =200;
let imageData = ctx.createImageData(width, height);

for (let x = 0; x < width; x++) {
    let r;
    let g;
    let b;
    let a=255;
    if(x<width/2){//si aun no llegue a la mitad del rectangulo
        let coef= 255 / (width/2);
        r=coef*x;//voy aumentado el R y el G para conseguir el amarillo
        g=coef*x;
        b=0;
    }
    else{//si llegue a la mitad del rectangulo
        let coef = 255/(x/2);
        //color=factor * 255
        console.log(coef);
        r = coef * x;
        g = coef * x;
        b = 0;
    }
    for (let y = 0; y < height; y++) {
        setPixel(imageData, x, y, r, g, b, a);
    }
}

ctx.putImageData(imageData,30,30);

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}