import { Vertex } from './Vertex';

export class Ball {
  position: Vertex;
  
  constructor(x: number, y: number){
    this.position = new Vertex(x,y);
  }
}
