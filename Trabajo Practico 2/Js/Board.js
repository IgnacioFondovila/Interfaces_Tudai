class Board {
  constructor(r, c, ctx, canvas, img, backImg) {
    this.firstDraw = true;
    this.rows = r;
    this.columns = c;
    this.ctx = ctx;
    this.backImg = backImg;
    this.cvs = canvas;
    this.img = img;
    this.slider=[];
    this.firstDrawing();
  }

  firstDrawing() {
    let aux = this;
    this.img.setAttribute("width", this.getWidth());
    this.img.setAttribute("height", this.getHeight());
    this.backImg.setAttribute("width", this.getWidth());
    this.backImg.setAttribute("height", this.getHeight());
    let imgSrc = new XMLSerializer().serializeToString(this.img);
    this.img = new Image();
    this.img.onload = function () {
        aux.draw();
        aux.draw();
    };
    this.img.src ="data:image/svg+xml; charset=utf8, " + encodeURIComponent(imgSrc);
  }

  draw(){
    if(this.firstDraw) {
      this.cvs.width = this.img.width + this.getPackageWidth() * 2;
      this.cvs.height = this.getHeight() + this.getPackageWidth();
      let pst = this.cvs.width / 2 - this.img.width / 2;
      ctx.drawImage(this.img, pst, this.cvs.height - this.getHeight());
      this.firstDraw = false;
    }else {
        this.cutBoard();
        this.firstDraw = true;
    }
  }
  
    getRadius() {
        return 30;
    }
    
    getHeight() {
        return this.rows * this.getChipSize();
    }
  
    getWidth() {
        return this.columns * (this.getChipSize() + this.getRadius());
    }
    
    getChipSize() {
        return this.getRadius() * 2;
    }

    getPackageColumns() {
        return Math.round(this.getTotalChips() / 2 / this.rows);
    }

    getSliderPositions() {
        return this.slider;
    }

    getPackageWidth() {
      return this.getPackageColumns() * this.getChipSize();
    }

    getSpace() {
        return this.getWidth() / this.columns / 2;
    }
    getTotalChips() {
        return this.rows * this.columns;
    }

    makeGameBoard() {
        let gBoard = new Array();
        for (
        let x = this.getPackageWidth() + this.getSpace();
        x < this.getWidth() + this.getPackageWidth();
        x += this.getChipSize() + this.getRadius()
        ) {
        gBoard[x] = new Array(); //(cantFil);
        for (
        let y = this.cvs.height - this.getRadius();
        y > this.getPackageWidth();
        y -= this.getChipSize()
      ) {   
          gBoard[x][y] = null;
      }
    }
    return gBoard;
}
finishCard(){
    this.ctx.font = "bold 40px sans-serif";
    this.ctx.fillStyle="#d3cf55";
    this.ctx.fill()
    this.ctx.fillText("JUEGO TERMINADO",this.getPackageWidth()+this.getChipSize(),this.getChipSize())
}

cutBoard() {
    for (
        let x = this.getPackageWidth() + this.getSpace();
        x < this.getWidth() + this.getPackageWidth();
        x += this.getChipSize() + this.getRadius()
        ) {
        for (
        let y = this.cvs.height - this.getRadius();
        y > this.getPackageWidth();
        y -= this.getChipSize()
        ) {
          this.ctx.beginPath();
          this.ctx.lineTo(
              x - this.getRadius(),
          y + this.getRadius() + this.getChipSize()
          );
          this.ctx.lineTo(
          x - this.getRadius() + this.getChipSize(),
          y + this.getRadius() + this.getChipSize()
          );
          this.ctx.lineTo(
              x - this.getRadius() + this.getChipSize(),
          y + this.getRadius()
          );
          this.ctx.closePath();

          this.ctx.beginPath();
          this.ctx.moveTo(x, y);
          this.ctx.arc(x, y, this.getRadius(), 0, Math.PI * 2);
          this.ctx.fillStyle = "#006bff";
          this.ctx.fill("evenodd");
          this.ctx.closePath();
        }
    this.makeSlider(x);
    }
}

    makeSlider(x){
        for (
            let y = this.getPackageWidth() - this.getChipSize();
            y > this.getChipSize();
            y -= this.getChipSize()
        ){
            this.slider.push({x,y})
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.getRadius(), 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.moveTo(
                x,
                y+ this.getChipSize()
            )
            this.ctx.lineTo(
                x +this.getRadius(),
                y
                );
                this.ctx.lineTo(
                    x -this.getRadius(),
                    y
                    );
            this.ctx.fillStyle = "#006bff"; //blanco
            this.ctx.fill();
            this.ctx.closePath();
               
        }
    }
    
    
    putChip(chip,board){
        let arr=board[chip.getX()];
        for (
        let pos = this.cvs.height - this.getRadius();
        pos > this.getPackageWidth();
        pos -= this.getChipSize()) {   
            if(arr[pos]==null){
                chip.setPosition(chip.getX(),pos);   
                board[chip.getX()][pos]=chip;
                break;
            }   
        }  
        return chip; 
    }   
}
