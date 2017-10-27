import * as Phaser from 'phaser-ce';


export class GameOver extends Phaser.State {

	create() {

	}

	restartGame() {
		this.game.state.start("Main");
	}
	
	update(){
		if (this.game.input.activePointer.rightButton.isDown){
             this.restartGame();
         }
	}
	
	render(){
            this.game.debug.text("Game Over State",100,100);

  }

}