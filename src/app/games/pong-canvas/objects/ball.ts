import { GameObject } from './game-object';
import { Player } from './player';

export class Ball extends GameObject {
  
  radius: number;
  speed: number;

  constructor(x: number, y: number, radius: number){
    super(x, y, radius, radius);
    this.radius = radius;
  }
  
  // Returns true if a collision/boundary is hit
  move(x: number, y: number): boolean{
    /*
    if(debug){
      console.log('prev: ');
      console.log(this.position);
    }
    */
    
    
    this.position.x += x;
    this.position.y += y;
    
    /*
    console.log('expected: ');
    console.log(this.position);
    */
    
    // prevent movement out of boundary
    if(this.hasBoundary){
      
      if(this.position.x > this.boundary.xmax){
        return true;

      }
      if(this.position.x < this.boundary.xmin){
        return true;

      }
      if(this.position.y > this.boundary.ymax){
        return true;

      }
      if(this.position.y < this.boundary.ymin){
        return true;

      }
    }
    
    // TODO: Check for collisions with paddles
    if(this.collider){
      this.matchColliderToObject();
    }
    /*
    console.log('result: ');
    console.log(this.position);
    */
  }
  
  collidesPlayer(player: Player){
    
  }

}
