class Chip {
  constructor(posX, posY, radius, ctx, fillStyle, strokeStyle, player) {
    this.posX = posX;
    this.player = player;
    this.ctx = ctx;
    this.posY = posY;
    this.radius = radius;
    this.fill = fillStyle;
    this.stroke = strokeStyle;
    this.selected = false;
    this.img = new Image();
    this.img.src = "./Images/Ficha.png";
    this.firstDrawing();
  }

  firstDrawing() {
    let chip = this;
    this.img.onload = function () {
      this.width = chip.radius * 2;
      this.height = chip.radius * 2;
      chip.draw();
    };
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.fill;
    this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
    if (this.selected != false) {
      this.ctx.strokeStyle = this.stroke;
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }
    this.ctx.drawImage(
      this.img,
      this.posX - this.radius,
      this.posY - this.radius,
      this.img.width,
      this.img.height
    );
    this.ctx.closePath();
  }

  setSelected() {
    if (this.selected == true) {
      this.selected = false;
    } else {
      this.selected = true;
    }
  }

  setPosition(x, y) {
    this.posX =x;
    this.posY = y;
}

  areClicked(x, y) {
    let x_ = this.posX - x;
    let y_ = this.posY - y;
    return Math.sqrt(x_ * x_ + y_ * y_) < this.radius;
  }

  getPlayer(){
      return this.player
  }

  getFill(){
    return this.fill
  }

  getX(){
      return this.posX
  }
  getY(){
      return this.posY
  }

  toString() {
    let s = "[x:" + this.posX + "y:" + this.posY + "]";
    return s;
  }
}
