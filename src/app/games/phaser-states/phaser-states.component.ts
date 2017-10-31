import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateGame } from './state-game';
import * as Phaser from 'phaser-ce';
declare var $: any;

@Component({
  selector: 'app-phaser-states',
  templateUrl: './phaser-states.component.html',
  styleUrls: ['./phaser-states.component.css']
})
export class PhaserStatesComponent implements OnInit, OnDestroy {
  
  game: StateGame;
  
  constructor() {
    
  }

  ngOnInit() {
    this.game = new StateGame();
    $('div').on('contextmenu', '#myCanvas', function(e){ return false; });
  }
  
  ngOnDestroy(){
    this.game.destroy();
  }

}
