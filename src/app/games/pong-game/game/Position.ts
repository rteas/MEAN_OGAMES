export class Position {
  x: number;
  y: number;
  
  constructor(){}
  
  setPositionVector(x: number, y: number){
    this.x = x;
    this.y = y;
  }
  
  getPositionVector(){
    return [this.x, this.y];
  }
}
