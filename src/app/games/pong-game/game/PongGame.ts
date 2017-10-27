import * as Phaser from 'phaser-ce';

export class PongGame extends Phaser.Game{
  
    constructor(){
      super(800,600, Phaser.AUTO, 'content');
    }
}