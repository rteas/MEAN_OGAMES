export class Vertex {
  x: number;
  y: number;
  
  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }
  
  setPositionVertex(x: number, y: number){
    this.x = x;
    this.y = y;
  }
  
  getPositionVector(){
    return [this.x, this.y];
  }
}
