class Chip {
    constructor(posX, posY, radius, ctx, fillStyle, strokeStyle) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.fill = fillStyle;
        this.stroke = strokeStyle;
        this.img = new Image();
        this.img.src= "./Images/Ficha.png";
        this.firstDrawing(ctx);
    }

    firstDrawing(ctx) {
        let chip = this;
        this.img.onload = function() {
            this.width=chip.radius*2;
            this.height=chip.radius*2;
            chip.draw(this, ctx);
        }
    }

    draw(img, ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.fill;
        ctx.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI,true);
        ctx.fill();
        ctx.drawImage(img, this.posX-this.radius, this.posY-this.radius,img.width,img.height);
        ctx.closePath();
    }

    fichaSeleccionada(x, y) {
        let x_ = this.posX - x;
        let y_ = this.posY - y;
        return Math.sqrt(x_ * x_ + y_ * y_) < this.radius;
    }
    toString(){
        let s="[x:"+this.posX+"y:"+this.posY+"]";
        return s 
    } 
}