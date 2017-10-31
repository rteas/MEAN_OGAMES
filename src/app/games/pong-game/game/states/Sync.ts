import * as Phaser from 'phaser-ce';

export class Sync extends Phaser.State {
    
    players: number;    
    
    create(){
        this.players = 1;
    }
 
    update() {
        // get players from 
        
         if (this.game.input.activePointer.leftButton.isDown){
             this.game.state.start("Main");
         }
    }
    
    setPlayers(players: number){
        this.players = players;
    }
    
    render(){
            this.game.debug.text("Sync",100,100);

    }

}