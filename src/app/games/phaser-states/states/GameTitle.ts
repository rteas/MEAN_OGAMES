import * as Phaser from 'phaser-ce';

export class GameTitle extends Phaser.State {

	create() {

	}

	startGame() {
		this.game.state.start("Main");
	}

}

