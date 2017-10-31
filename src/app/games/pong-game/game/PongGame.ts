import * as Phaser from 'phaser-ce';

import { Boot } from './states/Boot';
import { Preload } from './states/Preload';
import { GameTitle } from './states/GameTitle';
import { GameOver } from './states/GameOver';
import { Main } from './states/Main';
import { Sync } from './states/Sync';

export class PongGame extends Phaser.Game{
    players: number;
    
    constructor(){
      super(800,600, Phaser.AUTO, 'content');
      this.players = 0;
      this.state.add('Boot', Boot, false);
      this.state.add('Preload', Preload, false);
      this.state.add('GameTitle', GameTitle, false);
      this.state.add('Sync', Sync, false);
      this.state.add('Main', Main, false);
      this.state.add('GameOver', GameOver, false);
      
      this.state.start('Boot');
    }
}