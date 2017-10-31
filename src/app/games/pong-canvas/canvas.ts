export class Canvas {
  
  canvas: any;
  context: any;
  width: number;
  height: number;
  
  // set the canvas, dimensions
  constructor(canvas: string, width: number, height: number){
    this.canvas = document.getElementById('pong');
    this.width = width;
    this.height = height;
    this.setBorders(width, height);

    this.context = this.canvas.getContext('2d');
    
    // draw dotted border
    this.canvas.setAttribute('style', "background-color: white;");
    
  }
  
  setBorders(width: number, height: number){
    this.canvas.width = width;
    this.canvas.height = height;
  }
  
  drawRect(x: number, y: number, width: number, height: number){
    this.context.fillRect(x, y, width, height);
  }
  
  drawColorRect(x: number, y: number, width: number, height: number, color: string){
    var prevColor = this.context.fillStyle;
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
    this.context.fillStyle = prevColor;
  }
  
  drawCircle(x: number, y: number, radius: number){
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2* Math.PI, false);
    this.context.fill();
  }
  
}
