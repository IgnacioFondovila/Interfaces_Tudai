class Board {
    
    constructor(r, c, ctx, canvas, img,backImg) {
        console.log(img);
        this.firstDraw=true;
        this.rows = r;
        this.columns = c;
        this.ctx = ctx;
        this.backImg=backImg;
        this.cvs = canvas;
        this.img = img;
        this.arregloDePosiciones = [];
        this.firstDrawing();
    }
    
    firstDrawing() {
        let aux = this;
        this.img.setAttribute("width", this.getWidth());
        this.img.setAttribute("height", this.getHeight());
        this.backImg.setAttribute("width", this.getWidth());
        this.backImg.setAttribute("height", this.getHeight());
        console.log(this.backImg.width.animVal.value);
        console.log(this.backImg.height.animVal.value);
        let imgSrc = new XMLSerializer().serializeToString(this.img);
        this.img=new Image();
        this.img.onload = function() {
            aux.draw(this);
            //ctx.drawImage(img4,0,0,canvas.width,canvas.height)
        }
        this.img.src = "data:image/svg+xml; charset=utf8, "+encodeURIComponent(imgSrc);
    }
    
    draw(img) {
        if(this.firstDraw){
            this.cvs.width = img.width + (this.getPackageWidth() *  2);
            this.cvs.height = this.getHeight() + this.getPackageWidth();
            let pst = (this.cvs.width/2) - (img.width/2);
            ctx.drawImage(img, pst, this.cvs.height -this.getHeight());
           // this.makeGameBoard();
            this.firstDraw=false;
        }
        else{
            console.log("caca")
            this.makeGameBoard();
            this.firstDraw=true;
        }
    }

    getRadius() {
        return 30;
    }

    getHeight(){
        return this.rows *this.getChipSize();
    }
    
    
    getWidth(){
        return 1.5*(this.columns * this.getRadius()*2);
    }
    
    getChipSize(){
        return this.getRadius() * 2;
    }

    getColFichero(){
        return this.this.getPackageColumns();
    }

    getSlideZoneWidth(){
        return this.getPackageWidth()*2+this.getWidth();
    }

    getPackageColumns(){
        return Math.round(( this.getTotalChips() / 2) / this.rows);
    }
    
    getPackageWidth() {
        return this.getPackageColumns()  * this.getChipSize();
    }
    
    getAltoFichero() {
        return this.getChipSize() * 2 + this.rows * this.getChipSize();
    }

    getFila(){
        return this.rows;
    }

    getX1() {
        return this.getChipSize()/2;
    }
    
    getX2() {
        return this.getPackageWidth() + this.getWidth() + this.getChipSize()/2;
    }
    
    getY() {
        return ((this.getChipSize() * 2) + (this.getChipSize()/2));
    }

    getTotalChips() {
        return this.rows * this.columns;
    }

    makeGameBoard(){
        let gBoard=new Array()//(cantCol); 
        /*  for(let x=0;x<this.rows;x++)
        gBoard[x]=new Array(); */
        for(let x = this.getPackageWidth() + this.getChipSize(); x <= this.getWidth()+this.getPackageWidth();x+=this.getChipSize()){
            gBoard[x]=new Array()//(cantFil); 
            
            for(let y= this.getHeight() + this.getPackageWidth() ; y > this.getPackageWidth() ; y -= this.getChipSize() ){ 
                
                gBoard[x][y]="save";
                console.log(gBoard);    
                
            }
        }
        this.cutBoard()
        return gBoard;
    }
    cutBoard(){
        for(let x = this.getPackageWidth() + this.getChipSize(); x <= this.getWidth()+this.getPackageWidth();x+=this.getChipSize()){
            for(let y= this.getHeight() + this.getPackageWidth() ; y > this.getPackageWidth() ; y -= this.getChipSize() ){ 
                /*this.ctx.beginPath();
                this.ctx.lineTo(x-this.getRadius(),  y+this.getRadius() + this.getChipSize());
                this.ctx.lineTo(x-this.getRadius() + this.getChipSize(), y+this.getRadius() + this.getChipSize());
                this.ctx.lineTo(x -this.getRadius() + this.getChipSize(), y+this.getRadius());
                this.ctx.closePath();*/
                this.ctx.beginPath();
                this.ctx.moveTo(x-this.getRadius() , y+this.getRadius());
                this.ctx.arc(x,y , this.getRadius(), 0, Math.PI*2, true); //inner counter-clockwise
                this.ctx.fill("evenodd");    
                this.ctx.closePath();
            
            }
        }   
    }
    /*ubicarFicha(jugador) {
        if(jugador==1){
            if(this.arregloDePosiciones!=[]){
                let lastUb=this.arregloDePosiciones.lastIndexOf();
                if(lastUb[1]!=(this.cvs.height-(this.altoDeFicha/2))){
                    let posicion=[
                        x:lastUb[0],
                        y:lastUb[1] + altoDeFicha
                    ]
                    this.arregloDePosiciones.push(posicion);
                    return    
                }
            }
        }   
        let anchoDelFichero= this.anchoDeFicha * this.columDeFichero;
        let altoDelFichero= this.altoDeFicha *this.fila;
        let posX= this.canvas +  anchoDeFicha;
        let posY=this.canvas + altoDeFicha;
    }*/
    
    
}
