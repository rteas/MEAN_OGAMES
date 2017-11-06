export class Canvas {
  
  canvas: any;
  context: any;
  width: number;
  height: number;
  
  // set the canvas, dimensions
  constructor(canvas: string, width: number, height: number){
    this.canvas = document.getElementById('pong');
    this.setBorders(width, height);

    this.context = this.canvas.getContext('2d');
    
    // draw dotted border
    this.canvas.setAttribute('style', "background-color: white;");
    
  }
  
  setBorders(width: number, height: number){
    this.canvas.width = width;
    this.canvas.height = height;
    
    // set class variables
    this.width = width;
    this.height = height;
  }
  
  clear(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
  }
  
  // draw a rectangle based on the center as the position
  drawColorRect(x: number, y: number, width: number, height: number, color: string){
    var prevColor = this.context.fillStyle;
    
    this.context.fillStyle = color;
    this.drawRect(x, y, width, height);
    this.context.fillStyle = prevColor;
  }
  
  drawRect(x: number, y: number, width: number, height: number){
    // offset the position to draw
    var startX = x - width/2;
    var startY = y - height/2;
    this.context.fillRect(startX, startY, width, height);
  }
  
  drawCircle(x: number, y: number, radius: number){
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2* Math.PI, false);
    this.context.fill();
  }
  
}
