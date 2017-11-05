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
  debug: boolean = false;
  
  constructor(x: number, y: number, width: number, height: number){
    this.position = new Vector(x,y);
    this.width = width;
    this.height = height;
    
    this.colliderEnabled = false;
    this.hasBoundary = false;
    
    this.collisions = [];
    
    console.log('initial position: ');
    console.log(this.position);
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
    
    if(this.collider){
      this.matchColliderToObject();
    }
    /*
    console.log('result: ');
    console.log(this.position);
    */
  }
  
  matchColliderToObject(){
    this.collider.setCollider(this.position.x-this.width/2,
                              this.position.x+this.width/2,
                              this.position.y-this.height/2,
                              this.position.y+this.height/2
                              );
  }
  
  addCollision(gameObject: GameObject){
    this.collisions.push(gameObject);
  }
  
  collidesWith(gameObject: GameObject): boolean{
    return this.collider.collidesWith(gameObject.collider);
  }
  
}
