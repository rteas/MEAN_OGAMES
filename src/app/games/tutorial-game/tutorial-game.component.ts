import { Component, OnInit } from '@angular/core';

import { Game, AUTO } from 'phaser-ce';

@Component({
  selector: 'app-tutorial-game',
  templateUrl: './tutorial-game.component.html',
  styleUrls: ['./tutorial-game.component.css']
})
export class TutorialGameComponent implements OnInit {
  title = "Phaser-Tutorial"
  game: Game;
  assets: string = "assets/phaser/tutorial_02";

  constructor() { }

  ngOnInit() {
    
    console.log(this.assets);
    
    this.game = new Game(800,600, AUTO, '', { preload: this.preload, 
                                              create: this.create, 
                                              update: this.update
    });
  }
  
  preload(){
    this.game.load.image('sky', this.assets+'/img/sky.png');
    this.game.load.image('ground', this.assets+'/img/platform.png');
    this.game.load.image('star', this.assets+'/img/star.png');
    this.game.load.spritesheet('dude', this.assets+'/img/dude.png', 32, 48);
  }
  
  create(){
    
  }
  
  update(){
    
  }
  
  
  

}
