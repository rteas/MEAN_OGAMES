import { Vector } from './vector';
import { Collider } from './collider';
import { Boundary } from '../boundary';

export class GameObject {
  position: Vector;
  width: number;
  height: number;
  collider: Collider;
  collisions: GameObject[];
  colliderEnabled: boolean;
  boundary: Boundary;
  hasBoundary: boolean;
  
  
  constructor(x: number, y: number, width: number, height: number){
    this.position = new Vector(x,y);
    this.width = width;
    this.height = height;
    
    this.colliderEnabled = false;
    this.hasBoundary = false;
    
    this.collisions = [];
    
  }
  
  // calculate and set default collider using the
  // position of the gameobject as the center
  addCollider(x: number, y: number, width: number, height: number){
    
    this.collider = new Collider(x-width/2, 
                                  x+width/2,
                                  y-width/2,
                                  y+width/2
                                );
    this.colliderEnabled = true;
  }
  
  addBoundary(xmin: number, xmax: number, ymin: number, ymax: number){
    this.boundary = new Boundary(xmin, xmax, ymin, ymax);
    this.hasBoundary = true;
  }
  
  removeCollider(){
    this.collider = null;
    this.colliderEnabled = false;
  }
  
  disableCollider(){
    this.colliderEnabled = false;
  }
  
  setPosition(x: number, y: number){
    this.position.x = x;
    this.position.y = y;
  }
  
  // move object and it's collider, 
  // checking for collision if enabled
  move(x: number, y: number){
    console.log('prev x: '+ this.position.x);
    this.position.x += x;
    console.log('expected x: '+ this.position.x);
    this.position.y += y;
    
    // prevent movement out of boundary
    if(this.hasBoundary){
      if(this.position.x > this.boundary.xmax){
      this.position.x = this.boundary.xmax;
      }
      if(this.position.x < this.boundary.xmin){
        this.position.x = this.boundary.xmin;
      }
      if(this.position.y > this.boundary.ymax){
        this.position.y = this.boundary.ymax;
      }
      if(this.position.y < this.boundary.ymin){
        this.position.y = this.boundary.ymin;
      }
    }
    
    // move collider if enabled
    if(this.colliderEnabled){
      this.collider.move(x,y);
    }
    console.log('result x: '+ this.position.x);
  }
  
  addCollision(gameObject: GameObject){
    this.collisions.push(gameObject);
  }
  
  collidesWith(gameObject: GameObject): boolean{
    return this.collider.collidesWith(gameObject.collider);
  }
  
}
