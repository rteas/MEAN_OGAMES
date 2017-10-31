import * as Phaser from 'phaser-ce';

export class GameTitle extends Phaser.State {

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
             this.game.state.start("Sync");
         }
    }
    
    render(){
            this.game.debug.text("Game Title",100,100);

    }

}

