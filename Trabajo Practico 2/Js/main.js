let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let player1=null;
let chips1 = [];
let fillStyleP1 = null;
let strokeStyleP1 = '#D46000';
let p1 = document.getElementById("p1");
let colorP1 = document.querySelector("#color-picker1");

let player2=null;
let chips2 = [];
let fillStyleP2 = null;
let strokeStyleP2 = '#0A2699';
let p2 = document.getElementById("p2");
let colorP2 = document.querySelector("#color-picker2");

colorP1.addEventListener("change",function(){
    fillStyleP1=colorP1.value;
})
colorP2.addEventListener("change",function(){
    fillStyleP2=colorP2.value;
})
/*
let backImages = [];
img1 = new Image();
img1.src = "./Images/fondoTablero1.jpg";
img2 = new Image();
img2.src = "./Images/fondoTablero2.jpg";
img3 = new Image();
img3.src = "./Images/fondoTablero3.jpg";
backImages.push(img1);
backImages.push(img2);
backImages.push(img3); */
svgElement=document.querySelector("#svgElement");
svgRect=document.querySelector("#svgRect");
img4 = new Image();
img4.src = "./Images/fondoCanvas.jpg";
//----------------------Board----------------
let board = null;
let gameBoard=null;

let startBtn=document.querySelector("#start");
document.querySelector('#btnStart').addEventListener("click", function (){
    board=getBoardSelected();
    startBtn.addEventListener("click",startGame())
})

function startGame(){
    console.log("inicio")
    let names=document.querySelectorAll(".playerName");
    player1=names[0].value;
    player2=names[1].value;
    if(board!=null){
        canvas.hidden=false
        makeChips(board);
        startBtn.style.visibility = 'hidden';
        document.querySelector("#form").style.visibility = 'hidden';
        document.querySelector("#vis").hidden=false;
        let tx1=document.createTextNode(player1);
        let tx2=document.createTextNode(player2);
        p1.append(tx1);
        p2.append(tx2);
    }
}


function makeChips(board){

    // Fichero izquierdo
    for (let posX = board.getRadius(); posX < board.getPackageWidth(); posX += board.getChipSize()) {
        for (let posY = board.getHeight()-board.getRadius()+board.getPackageWidth(); posY > board.getPackageWidth() && chips1.length < board.getTotalChips()/2; posY -= board.getChipSize()) {
            let chip= new Chip(posX, posY,board.getRadius(),canvas.getContext("2d"), fillStyleP1, strokeStyleP1);
                chips1.push(chip);
            }
        }
    
        // Fichero derecho
        
        for (let posX = board.getWidth()+board.getPackageWidth()+board.getRadius(); posX <= ((board.getPackageWidth() * 2) + board.getWidth());posX += board.getChipSize()) {
            for (let posY = board.getHeight()-board.getRadius()+board.getPackageWidth();
             posY > board.getPackageWidth() && chips2.length < board.getTotalChips()/2;
              posY -= board.getChipSize()) {
                let ficha= new Chip(posX, posY, board.getRadius(), ctx, fillStyleP2, strokeStyleP2);
                chips2.push(ficha);
            }
        }
        
        
}

function getBoardSelected(){
    let boards=document.querySelector("#boards");
    let aux=null;
    switch (boards.value) {
        case "0":
            document.querySelector("#alert").hidden = false;
            break;
        case "1":
            //Tablero de 6x7
            // img1 = new Image();
            // img1.src = "./Images/fondoTablero1.jpg";
            aux = new Board(7, 6, ctx, canvas, svgElement,svgRect);
            // tableroFondo = imagenes[0];
            break;
        case "2":
                //Tablero de 8x5
                img2 = new Image();
                img2.src = "./Images/fondoTablero2.jpg";
                aux = new Board(9, 6, ctx, canvas, svgElement,svgRect);
                // tableroFondo = imagenes[0];
                break;
        case "3":
            //Tablero de 8x5
            img3 = new Image();
            img3.src = "./Images/fondoTablero3.jpg";
            aux = new Board(8, 5, ctx, canvas,svgElement,img4);
            // tableroFondo = imagenes[0];
            break;
        };
    return aux;
}
