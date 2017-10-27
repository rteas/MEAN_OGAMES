import { ExampleObject } from '../objects/ExampleObject';
import * as Phaser from 'phaser-ce';

export class Main extends Phaser.State {

    create() {
 
        //Enable Arcade Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
 
        //Set the games background colour
        this.game.stage.backgroundColor = '#cecece';
        
        this.game.input.mouse.capture = true;
 
        //Example of including an object
        //let exampleObject = new ExampleObject(this.game);
        
        
    }
 
    update() {
         if (this.game.input.activePointer.leftButton.isDown){
             this.game.state.start("GameOver");
         }
    }
    
    render(){
            this.game.debug.text("Main State",100,100);

    }
}