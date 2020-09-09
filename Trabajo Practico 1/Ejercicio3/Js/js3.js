"USE STRICT";
let ctx = document.querySelector("#canvas").getContext("2d");
let width = 300;
let height = 200;
let imageData = ctx.createImageData(width, height);
for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        setPixel(imageData, x, y, 28, 200, 20, 140);
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