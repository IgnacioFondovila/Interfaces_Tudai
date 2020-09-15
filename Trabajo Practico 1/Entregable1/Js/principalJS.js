"USE STRICT";
canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d");
let canOriginalW = canvas.width;
let canOriginalH = canvas.height;
let canvasData = ctx.createImageData(canOriginalW, canOriginalH);

let color = document.querySelector("#color-picker");
let btnColor = document.querySelector("#color");
let filters = document.querySelector("#filterSelector");
let inputImage = document.querySelector('#inputImage');
let imageData = canvasData;
let originalImageData = null;
let imageModify = canvasData;
/*function clickInput() {
    document.querySelector('#foto-input').click();
}
onclick="document.querySelector('#inputImage').click();"*/
//let lastImages=[]; arreglo de versiones previas
document.querySelector('#btnImage').addEventListener("click", function () {
    document.querySelector('#inputImage').click();
});
let lastImage = imageModify;
//let lastDrawing = lastImage;
let btnRevertCambio = document.querySelector("#revert");
let btnRevertCambios = document.querySelector("#reverts");
let cleanCanvas = document.querySelector('#deleteImage');
btnRevertCambio.disabled = true;
btnRevertCambios.disabled = true;

//-------------------------------Lienzo-----------------------------------------     

let lienzo = document.querySelector('#inputLienzo');
let pinceles = document.querySelector("#pinceles");
let pxInput = document.querySelector("#pincelPX");//Slider Pincel

document.querySelector('#btnLienzo').addEventListener("click", function () {
    lienzo.click();
    lienzo.addEventListener("click", function () {
        btnRevertCambios.disabled = true;
        btnRevertCambio.disabled = true;
        ctx.putImageData(originalImageData, 0, 0);
        imageData = canvasData;
        lienzo.hidden = true;
    })
    saveOriginalImage()
    document.querySelector('.botoneraPincel').hidden=false;
    canvas.hidden = false;
    document.querySelector(".funct").hidden = false;
    btnColor.hidden = false;
    this.style.visibility = "hidden";
    document.querySelector("#alertImg").hidden=true;
})

//-------------------------------Dibujo-----------------------------------------     
let herramienta;
let accion = false;
let havePuntos = false;
let lastX = 0;
let lastY = 0;
let sizePincel = 1;
let penColor = [];

//---control de acciones---
canvas.addEventListener("mousedown", function () {
    accion = true;
});

canvas.addEventListener("mouseup", function () {
    accion = false;
    havePuntos = false;
});

canvas.addEventListener("mouseleave", function () {
    accion = false;
    havePuntos = false;
})

pinceles.addEventListener("click", function () {
    herramienta = this.value;
    pinceles.value = "Hid"
});

//---Cambiar Color---
document.querySelector("#color").addEventListener("click", function () {
    color.click()
})

color.addEventListener("change", function () {
    let hex = color.value.toString(16);
    penColor = hexToRgbA(hex);
})

function hexToRgbA(hex) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
    }
}


//---Tamaño pincel---

    let sliderValor = document.querySelector("#slider");
    pxInput.addEventListener("input", slider);
    function slider(){ //ANDA
        //console.log(tamanioPincel.value);
        sliderValor.innerHTML = pxInput.value;
        sizePincel= pxInput.value;
    };

function drawWithSize(horiz, vert, r, g, b, a) {
    let distance = sizePincel - 1;
    for (let x = horiz - distance; x <= horiz + distance; x++) {
        for (let y = vert - distance; y <= vert + distance; y++) {
            if (x < canvas.width && x >= 0 && y < canvas.height && y >= 0) {
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
    }
}

//-----Pintado-----

canvas.addEventListener("mousemove", function (e) {
    if (accion) {
        //  lastDrawing = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;
        dibujarPixel(imageData, x, y);
        chequeoPuntos(x, y);
        //lastDrawing=imageData;
        ctx.putImageData(imageData, 0, 0);
    }
});

function chequeoPuntos(x, y) {
    //si no dibuje anteriormente declaro mis nuevos puntos
    //si tengo puntos los uno con los actuales
    if (!havePuntos) {
        lastX = x;
        lastY = y;
        havePuntos = true;
    } else {
        hacerLinea(lastX, lastY, x, y)
        lastX = x;
        lastY = y;
    }
}

function dibujarPixel(x, y) {
    //que no dibuje de ambos lados
    if (herramienta != "borrador") {
        if (penColor != []) {
            if (sizePincel == 1) {
                setPixel(imageData, x, y, penColor[0], penColor[1], penColor[2], 255);
            } else {
                drawWithSize(x, y, penColor[0], penColor[1], penColor[2], 255);
            }
        } else {
            if (sizePincel == 1) {
                setPixel(imageData, x, y, 0, 0, 0, 255);
            } else {
                drawWithSize(x, y, 0, 0, 0, 255);
            }
        }
    } else {
        if (sizePincel == 1) {
            setPixel(imageData, x, y, 255, 255, 255, 255);
        } else {
            drawWithSize(x, y, 255, 255, 255, 255);
        }
    }
}

function hacerLinea(lastX, lastY, x, y) {
    if (lastX < x) {
        for (let i = lastX; i < x; i++) {
            dibujarPixel(i, calcularY(i, lastX, lastY, x, y));
        }
    } else {
        for (let i = lastX; i > x; i--) {
            dibujarPixel(i, calcularY(i, lastX, lastY, x, y));
        }
    }
    if (lastY < y) {
        for (let i = lastY; i < y; i++) {
            dibujarPixel(calcularX(i, lastX, lastY, x, y), i);
        }
    } else {
        for (let i = lastY; i > y; i--) {
            dibujarPixel(calcularX(i, lastX, lastY, x, y), i);
        }
    }
}

function calcularX(i, lastX, lastY, x, y) {
    return Math.floor(((i - lastY) / (y - lastY)) * (x - lastX) + lastX);
}

function calcularY(i, lastX, lastY, x, y) {
    return Math.floor(((i - lastX) / (x - lastX)) * (y - lastY) + lastY);
}

//-------------------------------Image-----------------------------------------     
let reiniciar = document.querySelector("#OriginalImage");
let downloadImage = document.querySelector("#downloadImage");
let revert = document.querySelector("#oldImage");

//---Charge---

inputImage.onchange = e => {
    let file = e.target.files[0];
    if (areImg(file)) {
        canvas.hidden = false;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = readerEvent => {
            let content = readerEvent.target.result; // this is the content! 
            let image = new Image();
            //image.crossOrigin = 'Anonymous';
            image.src = content;

            image.onload = function () {
                let arrWxH = adaptCanvasTo(this);
                let imageScaledWidth = arrWxH[0];
                let imageScaledHeight = arrWxH[1];
                // draw image on canvas
                canvasData = ctx.createImageData(imageScaledWidth, imageScaledHeight);
                ctx.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
                imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                // get imageData from content of canvas
                if (originalImageData == null) {
                    btnRevertCambio.disabled = true;
                    saveOriginalImage()
                    imageModify = originalImageData;
                }
                else {
                    btnRevertCambio.disabled = false;
                    imageModify = imageData;
                }
                ctx.putImageData(imageData, 0, 0);
                filters.hidden=false;
                //lienzo.hidden=true;
            }
            lastImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
            document.querySelector("#alertImg").hidden = true;
            document.querySelector('.botoneraPincel').hidden=false;
            document.querySelector('#btnLienzo').style.visibility = 'hidden';
            document.querySelector('#btnLienzo').style.display='none';
        }
    } else {
        document.querySelector("#alertImg").hidden = false
    }
    document.querySelector(".funct").hidden = false;
    inputImage.value = null;
}

function areImg(imagen) {
    isImg = true;
    let imgType = imagen['type'];
    if (imgType == 'image/jpeg' || imgType == 'image/jpg' || imgType == 'image/png') {
        isImg = true;
    } else {
        isImg = false;
    }
    return isImg;
}

function adaptCanvasTo(picture) {
    let arr = [];
    let imageAspectRatio;
    let imageScaledWidth;
    let imageScaledHeight;
    if (picture.width > picture.height) {
        imageAspectRatio = (1.0 * picture.height) / picture.width;
        imageScaledWidth = canOriginalW;
        imageScaledHeight = canOriginalH * imageAspectRatio;
    } else {
        imageAspectRatio = (1.0 * picture.width) / picture.height
        imageScaledWidth = canOriginalW * imageAspectRatio
        imageScaledHeight = canOriginalH;
    }
    arr.push(imageScaledWidth);
    arr.push(imageScaledHeight);
    canvas.width = imageScaledWidth;
    canvas.height = imageScaledHeight;
    return arr;
}

//---Download---

document.querySelector("#download").addEventListener("click", function () {
    downloadImage.click();
})

downloadImage.addEventListener("click", download);
function download() {
    downloadImage.href = canvas.toDataURL();
    downloadImage.download = "myProyect.png";
}

//---Delete---

document.querySelector("#clean").addEventListener("click", function () {
    cleanCanvas.click();
})

cleanCanvas.addEventListener("click", function () {
    lastImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    iData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            setPixel(iData, x, y, 255, 255, 255, 255);
        }
    }
    ctx.putImageData(iData, 0, 0);
    imageData = iData;
    btnRevertCambio.disabled = false;
})

//---Revertir cambio---

document.querySelector("#revert").addEventListener("click", function () {
    revert.click()
})

revert.addEventListener("click", function () {
    if (lastImage != canvasData) {
        let arr = adaptCanvasTo(lastImage)
        canvas.width = arr[0];
        canvas.height = arr[1];
        ctx.putImageData(lastImage, 0, 0);

        imageData = lastImage;
        btnRevertCambio.disabled = true;
    } else {
        ctx.putImageData(imageData, 0, 0);
        btnRevertCambio.disabled = true;
    }
    if (lastImage != originalImageData) {
        btnRevertCambios.disabled = false
    }
})

//--Reiniciar Proyecto

btnRevertCambios.addEventListener("click", function () {
    reiniciar.click()
})
reiniciar.addEventListener("click", function () {
    resetImage();
    saveOriginalImage();
    btnRevertCambio.disabled = false;
    btnRevertCambios.disabled = true;
})

function saveOriginalImage() {
    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function resetImage() {
    let arr = adaptCanvasTo(originalImageData)
    canvas.width = arr[0];
    canvas.height = arr[1];
    imageData = originalImageData
    ctx.putImageData(originalImageData, 0, 0);
}

//---Filters---
filters.addEventListener("change", function () {
    lastImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let image = imageData;
    imageModify = image;
    let data = image.data;
    if (filters.value == "fNegativo") {
        for (let i = 0; i < data.length; i += 4) {
            data[i + 0] = 255 - getRed(i);
            data[i + 1] = 255 - getGreen(i);
            data[i + 2] = 255 - getBlue(i);
        }
        ctx.putImageData(image, 0, 0)
    }
    else if (filters.value == "fBinary") {
        let umbral = 50
        for (let i = 0; i < data.length; i += 4) {
            let promedio = Math.floor((getRed(i) + getGreen(i) + getBlue(i)) / 3)
            if (promedio > umbral) {
                data[i + 0] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
            } else {
                data[i + 0] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
            }
        }
        ctx.putImageData(image, 0, 0);
    }
    else if (filters.value == "fSepia") {
        for (let i = 0; i < data.length; i += 4) {
            let promedio = Math.floor((getRed(i) + getGreen(i) + getBlue(i)) / 3)
            data[i + 0] = Math.min(promedio + 40, 255)
            data[i + 1] = Math.min(promedio + 15, 255)
            data[i + 2] = Math.min(promedio, 255)
        }
        ctx.putImageData(image, 0, 0)
    }

    else if (filters.value == "fGscale") {
        for (let i = 0; i < data.length; i += 4) {
            let grayscale = getRed(i) * .3 + getGreen(i) * .59 + getBlue(i) * .11;
            data[i + 0] = grayscale;    // r
            data[i + 1] = grayscale;    // g
            data[i + 2] = grayscale;    // b
        }
        ctx.putImageData(image, 0, 0)
    }
    else if (filters.value == "fSat") {
        let r = 0, g = 0, b = 0, a = 0;
        for (let i = 0; i < canvas.width - 1; i++) {
            for (let j = 0; j < canvas.height; j++) {
                let ind = (i + j * image.width) * 4
                r = data[ind] / 255
                g = data[ind + 1] / 255
                b = data[ind + 2] / 255
                let cmax = Math.max(r, g, b)
                let cmin = Math.min(r, g, b)
                let delta = cmax - cmin
                let hue = getHue(delta, cmax, r, g, b)
                let light = getLight(cmax, cmin)
                let sat = getSaturacion(light, delta) + 0.3
                let c = getC(sat, light)
                let x = getX(hue, c)
                let m = light - (c / 2)
                let arrNewRGB = getNewRGB(hue, c, x)
                r = arrNewRGB[0];
                g = arrNewRGB[1];
                b = arrNewRGB[2];
                let newRed = (r + m) * 255
                let newGreen = (g + m) * 255
                let newBlue = (b + m) * 255
                setPixel(image, i, j, newRed, newGreen, newBlue, 255)
            }
        }
        ctx.putImageData(image, 0, 0)
    } else if (filters.value == "fDetec") {
        let Mat = [1, 1, 1, 1, -7, 1, 1, 1, 1]//deteccion de borde
        //[0, -1, 0, -1, 5, -1, 0, -1, 0];//Nitidez
        //[1/19,1/19,1/19,1/19,1/19,1/19,1/19,1/19,1/19]//blur
        /*Efecto Flaaaaasheraazo
        let prom = 3;//Math.round(Math.sqrt(blurMat.length));
        let halfProm = 1;//Math.floor(prom / 2);
        let w = canvas.width;
        let h = canvas.height;
        let inputData = ctx.getImageData(0, 0, w, h).data
        let output = image.data
        let altery;
        let alterx;
        let inptIndex;
        let ouptIndex;
        let weight;
        let pxAvove;
        for (let x = 0; x < w; ++x) {
            pxAvove = x * w
            
            for (let y = 0; y < h; ++y) {
                
                let r = 0, g = 0, b = 0, a = 0;
                
                for (let matY = 0; matY < prom; ++matY) {
                    
                    for (let matX = 0; matX < prom; ++matX) {
                        weight = blurMat[matY * prom + matX];
                        altery = Math.min(
                            h - 1,
                            Math.max(0, x + matY - halfProm)
                            );
                        alterx = Math.min(
                            w   - 1,
                            Math.max(0, y + matX - halfProm)
                            )
                            inptIndex = (alterx * x + altery) * 4;
                            r += inputData[inptIndex] * weight;
                        g += inputData[inptIndex + 1] * weight;
                        b += inputData[inptIndex + 2] * weight;
                        a += inputData[inptIndex + 3] * weight;
                    }

                }
                ouptIndex = (pxAvove + y) * 4
                output[ouptIndex] = r;
                output[ouptIndex + 1] = g;
                output[ouptIndex + 2] = b;
                output[ouptIndex + 3] = blurMat.normalized ? a : 255;;
            }
        }
        ctx.putImageData(image, 0, 0)*/
        convolution(Mat,image);
    }
    else if(filters.value == "fNitid"){
        let Mat=[0, -1, 0, -1, 5, -1, 0, -1, 0];//Nitidez
        convolution(Mat,image);
    }
    btnRevertCambio.disabled = false;
    btnRevertCambios.disabled = false;
    filters.value = "Hid";
})
//---Mat convolution Filters---
function convolution(Mat,image){
    let size = Math.sqrt(Mat.length);
    let half = Math.floor(size / 2);

    let width = canvas.width;
    let height = canvas.height;

    let inputData = ctx.getImageData(0, 0, width, height).data;

    let outputData = image.data;

    let pixelsAbove;

    let weight;
    let neighborY;
    let neighborX;

    let inputIndex;
    let outputIndex;

    for (let i = 0; i < height; ++i) {
        pixelsAbove = i * width;
        for (let j = 0; j < width; ++j) {
            r = 0;
            g = 0;
            b = 0;
            a = 0;

            for (let matY = 0; matY < size; ++matY) {
                for (let matX = 0; matX < size; ++matX) {
                    weight = Mat[matY * size + matX];
                    neighborY = Math.min(
                        height - 1,
                        Math.max(0, i + matY - half)
                    );
                    neighborX = Math.min(
                        width - 1,
                        Math.max(0, j + matX - half)
                    );
                    inputIndex = (neighborY * width + neighborX) * 4;
                    r += inputData[inputIndex] * weight;
                    g += inputData[inputIndex + 1] * weight;
                    b += inputData[inputIndex + 2] * weight;
                    a += inputData[inputIndex + 3] * weight;
                }
            }
            outputIndex = (pixelsAbove + j) * 4;
            outputData[outputIndex] = r;
            outputData[outputIndex + 1] = g;
            outputData[outputIndex + 2] = b;
            outputData[outputIndex + 3] = Mat.normalized ? a : 255;
        }
    }
    ctx.putImageData(image, 0, 0);
}



//---saturacion methods---

function getNewRGB(hue, c, x) {
    if (hue >= 0 && hue < 60) {
        return [c, x, 0]
    } else if (hue >= 60 && hue < 120) {
        return [x, c, 0]
    } else if (hue >= 120 && hue < 180) {
        return [0, c, x]
    } else if (hue >= 180 && hue < 240) {
        return [0, x, c]
    } else if (hue >= 240 && hue < 300) {
        return [x, 0, c]
    } else {
        return [c, 0, x]
    }
}

function getX(hue, c) {
    let aux = ((hue / 60) % 2) - 1
    if (aux < 0) {
        aux = aux * -1
    }
    return c * (1 - aux)
}


function getC(sat, light) {
    let aux = 2 * light - 1
    if (aux < 0) {
        aux = aux * -1
    }
    return (1 - aux) * sat
}

function getSaturacion(light, delta) {
    if (delta == 0) {
        return 0
    } else {
        let aux = (2 * light) - 1
        if (aux < 0) {
            aux = aux * -1
        }
        return delta / (1 - ((2 * light) - 1))
    }
}

function getLight(cmax, cmin) {
    return (cmax + cmin) / 2
}

function getHue(delta, cmax, r, g, b) {
    if (delta == 0) {
        return 0
    } else if (cmax == r) {
        return Math.floor(60 * (((g - b) / delta) % 6))
    } else if (cmax == g) {
        return Math.floor(60 * (((b - r) / delta) + 2))
    } else {
        return Math.floor(60 * (((r - g) / delta) + 4))
    }
}

//---DataMatriz Methods---

function getRed(x) {
    return imageData.data[x];
}

function getGreen(x) {
    return imageData.data[x + 1];
}

function getBlue(x) {
    return imageData.data[x + 2];
}

function getAlpha(x) {
    return imageData.data[x + 3];
}

function setPixel(d, x, y, r, g, b, a) {
    let i = (x + y * d.width) * 4;
    d.data[i + 0] = r;
    d.data[i + 1] = g;
    d.data[i + 2] = b;
    d.data[i + 3] = a;
}