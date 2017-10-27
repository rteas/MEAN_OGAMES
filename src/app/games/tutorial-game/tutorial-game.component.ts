import { Component, OnInit, OnDestroy } from '@angular/core';

import { Game, AUTO, Text } from 'phaser-ce';

import * as Phaser from 'phaser-ce';

@Component({
  selector: 'app-tutorial-game',
  templateUrl: './tutorial-game.component.html',
  styleUrls: ['./tutorial-game.component.css']
})

/* 
This is code that has been copied from the phaser tutorial and modified
to fit typescript
*/

export class TutorialGameComponent implements OnInit, OnDestroy {
  title = "Phaser-Tutorial"
  game: Game;
  imgs: string = 'assets/phaser/tutorial_02/img/';
  player: any;
  platforms: any;
  cursors: any
  stars: any;
  score: number;
  scoreText: any;

  constructor() { }

  ngOnInit() {
    
    console.log("img: "+ this.imgs);
    
    // set game width to window width,
    // height = width for square window
    
    this.game = new Game(800,600, AUTO, 'content', { preload: this.preload, 
                                              create: this.create, 
                                              update: this.update
    });
  }
  
  preload(){
    this.game.load.image('sky', 'assets/phaser/tutorial_02/img/sky.png');
    this.game.load.image('ground', 'assets/phaser/tutorial_02/img/platform.png');
    this.game.load.image('star', 'assets/phaser/tutorial_02/img/star.png');
    this.game.load.spritesheet('dude', 'assets/phaser/tutorial_02/img/dude.png', 32, 48);
  }
  
  create(){
    this.score = 0;
    // this.game.add.sprite(0,0, 'star');
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.add.sprite(0,0, 'sky');
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
    ground.scale.setTo(2,2);
    ground.body.immovable = true;
    
    var ledge = this.platforms.create(400,400, 'ground');
    ledge.body.immovable = true;
    ledge = this.platforms.create (-150, 250, 'ground');
    ledge.body.immovable = true;
    
    this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
    
    // enable physics on player
    this.game.physics.arcade.enable(this.player);
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;
    
    this.player.animations.add('left', [0,1,2,3], 10, true);
    this.player.animations.add('right', [5,6,7,8], 10, true);
    
    //  Finally some stars to collect
    this.stars = this.game.add.group();

    //  We will enable physics for any star that is created in this group
    this.stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = this.stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    
    this.scoreText = this.game.add.text(16, 16, 'score: '+this.score, { font: '35px Arial', fill: '#000' });

  }
  
  collectStar(player: any, star: any){
    // remove star
    star.kill();
    
    //  Add and update the score
    this.score += 10;
    console.log(this.scoreText);
    //this.scoreText.setText('Score: ' + this.score);
    
    console.log('collect star called...?')
  }
  
  update(){
    
    this.game.physics.arcade.collide(this.stars, this.platforms);
    //  Collide the player and the stars with the platforms
    var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
    
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.game.physics.arcade.collide(this.player, this.stars, TutorialGameComponent.prototype.collectStar);
    //  Reset the players velocity (movement)
    this.player.body.velocity.x = 0;
    
    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.player.body.velocity.x = -150;

        this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 150;

        this.player.animations.play('right');
    }
    else
    {
        //  Stand still
        this.player.animations.stop();

        this.player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform)
    {
        this.player.body.velocity.y = -350;
    }
    
  }
  
  ngOnDestroy(){
    this.game.destroy();
    console.log('tutorial game destroyed');
  }
  

}
