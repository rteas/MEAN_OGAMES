import { Vertex } from './Vertex';

export class Player {
    position: Vertex;
    speed: number;
    name: string;
    height: number;
    width: number;
    
    constructor(name: string, x: number, y: number, speed: number){
        this.name = name;
        this.position = new Vertex(x,y);
        this.speed = speed;
    }
    
}
