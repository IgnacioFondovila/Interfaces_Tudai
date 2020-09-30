let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let inicial=true;
let origCounter=2;
let winner=document.querySelector("#wnner");
let reset=document.querySelector("#reset");
let finished=false;
let tx=null;
let txW=null;
let tx2=null;
let tx3=null;


let player1=null;
let chips1 = [];
let fillStyleP1 = null;
let strokeStyleP1 = '#c2fbff';
let p1 = document.getElementById("p1");
let colorP1 = document.querySelector("#color-picker1");
let lastClicked=null;

let player2=null;
let chips2 = [];
let fillStyleP2 = null;
let strokeStyleP2 = '#c2fbff';
let p2 = document.getElementById("p2");
let colorP2 = document.querySelector("#color-picker2");

// imgChip=new Image();
// imgChip.src = "./Images/Ficha.png";

colorP1.addEventListener("change",function(){
    console.log(colorP1.value)
    fillStyleP1=colorP1.value;
});

colorP2.addEventListener("change",function(){
    fillStyleP2=colorP2.value;
});
svgElement=document.querySelector("#svgElement");
svgRect=document.querySelector("#svgRect");
//style.fill="#dbf038"
//----------------------Board----------------
let board = null;
let gameBoard=null;

let startBtn=document.querySelector("#start");
document.querySelector('#btnStart').addEventListener("click", function (){
    finished=false;
    board=getBoardSelected();
    startBtn.addEventListener("click",startGame())
})

reset.addEventListener("click",function(){
    console.log("reinicio")
    canvas.hidden=true
    startBtn.style.visibility = 'visible';
    document.querySelector("#form").style.visibility = 'visible';
    document.querySelector("#vis").hidden=true;
    document.querySelector("#turn").removeChild(tx);
    document.querySelector("#cardW").hidden=true;
    document.querySelector("#cardL").hidden=true;
    winner.removeChild(txW)
    p1.removeChild(tx1)
    p2.removeChild(tx2)
    player1=null;
    player2=null;
    fillStyleP1 = null;
    fillStyleP2 = null;
    inicial= !inicial
    chips1 = [];
    chips2 = [];
    board=null
    tx=null;
    tx2=null;
    tx3=null;
    txW=null;
})

function startGame(){
    console.log("inicio")
    let names=document.querySelectorAll(".playerName");
    if(fillStyleP1==null){
        fillStyleP1=colorP1.value;
    }
    if(fillStyleP2==null){
        fillStyleP2=colorP2.value;
    }
    player1=names[0].value; 
    player2=names[1].value;
    names=[];
    if(board!=null){
        canvas.hidden=false
        makeChips(board);
        console.log("fich")
        gameBoard=board.makeGameBoard();
        startBtn.style.visibility = 'hidden';
        document.querySelector("#form").style.visibility = 'hidden';
        document.querySelector("#vis").hidden=false;
        tx1=document.createTextNode(player1);
        tx2=document.createTextNode(player2);
        tx =document.createTextNode("ES EL TURNO DE");
        document.querySelector("#turn").append(tx);
        p1.append(tx1);
        p2.append(tx2);
        postTurn()
        canvas.addEventListener("mousedown", onDown,false);
    }
}

function postTurn(){
    document.querySelector("#arrow1").style.background = fillStyleP1
    document.querySelector("#arrow2").style.background = fillStyleP2
    if(inicial){
        document.querySelector("#arrow1").hidden=false
        document.querySelector("#arrow2").hidden=true
        p2.style.background = "none";
        p1.style.background = fillStyleP1;
    }else{
        document.querySelector("#arrow1").hidden=true
        document.querySelector("#arrow2").hidden=false
        p1.style.background = "none";
        p2.style.background = fillStyleP2
    }
}

// -----------ChipsMovements-----------------------
let origX;
let origy;

//--------------------Mouse actions------------
function onDown(e) {
    let tX=e.layerX
    let tY=e.layerY
    if(inicial){
        if(tX < board.getPackageWidth() && tY > board.getPackageWidth()){
            lastClicked = verifyClick(tX,tY,chips1);
            if(lastClicked!=null){
                lastClicked.setSelected();
                origX=lastClicked.getX()
                origY=lastClicked.getY()
                canvas.addEventListener("mousemove", onMove, false);
                canvas.addEventListener("mouseup", onUp, false);
                canvas.addEventListener("mouseleave", onUp, false);
                reDrawing();
            }
        }
    }else{
        if(tX > board.getPackageWidth()+board.getWidth() && tY > board.getPackageWidth()){
            lastClicked = verifyClick(tX,tY,chips2);
            if(lastClicked!=null){
                lastClicked.setSelected()
                origX=lastClicked.getX()
                origY=lastClicked.getY()
                reDrawing();
                canvas.addEventListener("mousemove", onMove, false);
                canvas.addEventListener("mouseup", onUp, false);
                canvas.addEventListener("mouseleave", onUp, false);
            }
        }
    }
};

function onMove(e) {
    let mX=e.layerX
    let mY=e.layerY
    lastClicked.setPosition(mX,mY)
    reDrawing();
    canvas.addEventListener("mouseup", onUp, false);
}

function onUp(e){
    let lastX=e.layerX
    let lastY=e.layerY
    if(validPosition(lastX,lastY)){
        let newChip=board.putChip(lastClicked,gameBoard)
        // if(inicial){
            //     chips1.length=chips1.length-1;
            // }else{
        //     chips1.length=chips2.length-1;
        // }
        transicionChip(lastClicked,newChip.getX(),newChip.getY());
        if(verifyWinner(newChip,gameBoard)){
            let card=document.querySelector("#cardW");
            card.hidden=false;
            card.style.borderColor = newChip.getFill()
            if(lastClicked.getPlayer()!=2){
                txW=document.createTextNode("The winner is " + (player1));
                winner.append(txW);
            }else{
                txW=document.createTextNode(("The winner is "+ player2));
                winner.append(txW); 
            }
            canvas.removeEventListener("mousedown", onDown, false);
            document.querySelector("#vis").hidden=true;
            board.finishCard()
            finished=true;
        }
        inicial= !inicial;
        postTurn()
    }else{
        lastClicked.setPosition(origX,origY)
        lastClicked.setSelected()
    }
    // if(chips1.length==0&&chips2.length==0){
        //     document.querySelector("#cardL").hidden=false;
        // }
    lastClicked=null;
    origX=null
    origY=null
    if(!finished){
        reDrawing();
    }

    canvas.removeEventListener("mousemove", onMove, false);
    canvas.removeEventListener("mouseup", onUp, false);
}

function verifyWinner(chip,gameBoard){
    console.log(gameBoard);
    let counter=origCounter;
    let moveX=board.getChipSize()+board.getRadius();
    let moveY=board.getChipSize();
    //RowControl
    counter=verifyLeftWinner(chip,counter-1,moveX,gameBoard);
    if(counter!=0){
        counter=verifyRigthtWinner(chip,counter,moveX,gameBoard);
    }
    if(counter!=0){
        counter=origCounter;
        counter=verifyBottomWinner(chip,counter-1,moveY,gameBoard);
    }
    if(counter!=0){
        counter=origCounter;
        counter=verifyTopRightDiagonal(chip ,counter-1,moveX,moveY,gameBoard)
        if(counter!=0){
            counter=verifyBttmLeftDiagonal(chip ,counter,moveX,moveY,gameBoard);
        }
    }
    if(counter!=0){
        counter=origCounter;
        counter=verifyTopLeftDiagonal(chip ,counter-1,moveX,moveY,gameBoard)
        if(counter!=0){
            counter=verifyBttmRightDiagonal(chip,counter,moveX,moveY,gameBoard);
        }
    }
    if(counter==0){
        return true;

    }
    return false;
}

function verifyTopRightDiagonal(chip,counter,moveX,moveY,gameBoard){
    if(counter!=0){
        let rtx=chip.getX()
        let rty=chip.getY()
        console.log("verifyTopRightDiagonal");
        console.log(gameBoard[rtx+moveX]);
        if(gameBoard[rtx+moveX]!=null && gameBoard[rtx+moveX][rty-moveY]!=null){
            console.log(gameBoard[rtx+moveX][rty-moveY]);
            let rtChip=gameBoard[rtx+moveX][rty-moveY];
            if(rtChip!=null && rtChip.getPlayer() == chip.getPlayer()){
                counter=verifyTopRightDiagonal(rtChip , counter-1 , moveX,moveY,gameBoard);
            }
        }
    }
    return counter;
}
function verifyBttmRightDiagonal(chip,counter,moveX,moveY,gameBoard){
    if(counter!=0){
        let brx=chip.getX()
        let bry=chip.getY()
        console.log("verifyBttmRightDiagonal");
        console.log(gameBoard[brx-moveX]);
        if(gameBoard[brx-moveX]!=null && gameBoard[brx-moveX][bry+moveY]!=null){
            console.log(gameBoard[brx-moveX][bry+moveY]);
            let brChip=gameBoard[brx-moveX][bry+moveY];
            if(brChip!=null && brChip.getPlayer() == chip.getPlayer()){
                counter=verifyBttmRightDiagonal(brChip , counter-1 , moveX,moveY,gameBoard);
            }
        }
    }
    return counter;
}
function verifyTopLeftDiagonal(chip,counter,moveX,moveY,gameBoard){
    if(counter!=0){
        let ltx=chip.getX()
        let lty=chip.getY()
        console.log("verifyTopLeftDiagonal");
        console.log(gameBoard[ltx-moveX]);
        if(gameBoard[ltx-moveX]!=null && gameBoard[ltx-moveX][lty-moveY]!=null){
            console.log(gameBoard[ltx-moveX][lty-moveY]);
            let ltChip=gameBoard[ltx-moveX][lty-moveY];
            if(ltChip!=null && ltChip.getPlayer() == chip.getPlayer()){
                counter=verifyTopLeftDiagonal(ltChip , counter-1 , moveX,moveY,gameBoard);
            }
        }
    }
    return counter;
}
function verifyBttmLeftDiagonal(chip,counter,moveX,moveY,gameBoard){
    if(counter!=0){
        let blx=chip.getX()
        let bly=chip.getY()
        console.log("verifyBttmLeftDiagonal");
        console.log(gameBoard[blx-moveX]);
        if(gameBoard[blx-moveX]!=null && gameBoard[blx-moveX][bly+moveY]!=null){
            let blChip=gameBoard[blx-moveX][bly+moveY];
            if(blChip!=null && blChip.getPlayer() == chip.getPlayer()){
                counter=verifyBttmLeftDiagonal(blChip , counter-1 , moveX,moveY,gameBoard);
            }
        }   
    }
    return counter;
}
function verifyLeftWinner(chip,counter,index,gameBoard){
    if(counter!=0){
        let lx=chip.getX()
        let ly=chip.getY()
        if(gameBoard[lx-index]!=null && gameBoard[lx-index][ly]!=null){
            let lChip=gameBoard[lx-index][ly];
            if(lChip!=null && lChip.getPlayer() == chip.getPlayer()){
                counter=verifyLeftWinner(lChip , counter-1 , index,gameBoard);
            }
        }
    }
    return counter;
}

function verifyRigthtWinner(chip,counter,index,gameBoard){
    if(counter!=0){
        let rx=chip.getX()
        let ry=chip.getY()
        if(gameBoard[rx+index]!=null && gameBoard[rx+index][ry]!=null){
            let rChip=gameBoard[rx+index][ry];
            if(rChip !=null && rChip.getPlayer() == chip.getPlayer()){
                counter=verifyRigthtWinner(rChip,counter-1,index,gameBoard);
            }
        }
    }
    return counter;
}
// function verifyTopWinner(chip,counter,index,gameBoard){
//     if(counter!=0){
//         let tx=chip.getX()
//         let ty=chip.getY()
//         if(gameBoard[tx]!=null && gameBoard[tx][ty-index]!=null){
//             let tChip=gameBoard[tx][ty-index];
//             if(tChip !=null && tChip.getPlayer() == chip.getPlayer()){
//                 counter=verifyTopWinner(tChip,counter-1,index,gameBoard);
//             }
//         }
//     }
//     return counter;
// }
function verifyBottomWinner(chip,counter,index,gameBoard){
    if(counter!=0){
        let bx=chip.getX()
        let by=chip.getY()
        if(gameBoard[bx]!=null && gameBoard[bx][by+index]!=null){
            let bChip=gameBoard[bx][by+index];
            if(bChip !=null && bChip.getPlayer() == chip.getPlayer()){
                counter=verifyBottomWinner(bChip,counter-1,index,gameBoard);
            }
        }
    }
    return counter;
}


function transicionChip(chip,x,y){
    chip.setSelected()
    for(let i=board.getPackageWidth()+board.getRadius();i<=y;i+=board.getChipSize()){
        transicionPrint(chip,x,i);
    }
}

function transicionPrint(chip,x,y){
    chip.setPosition(x,y);
    reDrawing()
}

function verifyClick(x,y,chips){
    console.log(x+":"+y)
    let cAux = null;
    for (let c in chips) {
        if (chips[c].areClicked(x,y)) {
            console.log(chips[c])
            cAux=chips[c];
            break;
        }
    }
    console.log(2)
    return cAux;
}

function reDrawing(){
    board.draw()
    board.draw()
    for (let c in chips1) {
        chips1[c].draw();
    }
    for (let c in chips2) {
        chips2[c].draw();
    }
}

function fullColum(x){
    for(let y=board.getPackageWidth() + board.getRadius() ; y < board.getPackageWidth()+board.getHeight();y+=board.getChipSize()){
        if(gameBoard[x][y]==null){
           return false
        } 
    }
    return true;
}

 function validPosition(x,y){
    let slider= board.getSliderPositions();
    for (const s in slider) {
        let sx=slider[s].x-x;
        let sy=slider[s].y-y;
        if(Math.sqrt(sx * sx + sy * sy) < board.getRadius() && !fullColum(slider[s].x)){
            lastClicked.setPosition(slider[s].x,slider[s].y)
            return true;
        }      
    }
    return false;
}

function makeChips(board){

    for (let posX = board.getRadius(); posX < board.getPackageWidth(); posX += board.getChipSize()) {
        for (let posY = board.getHeight()-board.getRadius()+board.getPackageWidth(); posY > board.getPackageWidth() && chips1.length < board.getTotalChips()/2; posY -= board.getChipSize()) {
            let chip= new Chip(posX, posY,board.getRadius(),canvas.getContext("2d"), fillStyleP1, strokeStyleP1,1);
            chips1.push(chip);
            }
        }
        
        for (let posX = board.getWidth()+board.getPackageWidth()+board.getRadius(); posX <= ((board.getPackageWidth() * 2) + board.getWidth());posX += board.getChipSize()) {
            for (let posY = board.getHeight()-board.getRadius()+board.getPackageWidth();
             posY > board.getPackageWidth() && chips2.length < board.getTotalChips()/2;
             posY -= board.getChipSize()) {
                let ficha= new Chip(posX, posY, board.getRadius(), ctx, fillStyleP2, strokeStyleP2,2);
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
            //Tablero de 7x6
            aux = new Board(7, 6, ctx, canvas, svgElement,svgRect);
            
            break;
        case "2":
                //Tablero de 9x6
                aux = new Board(9, 6, ctx, canvas, svgElement,svgRect);
            
                break;
        case "3":
            //Tablero de 8x5
            aux = new Board(8, 5, ctx, canvas,svgElement,svgRect);
        
            break;
        };
    return aux;
}
