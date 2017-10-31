import * as Phaser from 'phaser-ce';
import { Player } from '../Player';
import { Ball } from '../Ball';

export class Main extends Phaser.State {
    
    players: number;
    graphics: any;
    player: any;
    speed: number;
    
    create() {
        this.speed = 300;
        // Get amount of players
        this.players = this.game.state.states['Sync'].players;
        
        // create main player
        this.player = new Player('test', 100,100, 500);
        this.player.height = 25;
        this.player.width = 100;
        
        this.initializePlayer(this.player);
        
        // Set the games background colour
        this.game.stage.backgroundColor = '#000000';
        
        this.game.input.mouse.capture = true;
 
    }
    
    initializePlayer(player: Player){
        this.graphics = this.game.add.graphics(player.position.x, player.position.y);
        // Initialize player by graphics
        
        this.graphics.beginFill(0xa9a904);
        
        // rectangle drawing
        this.graphics.moveTo(player.position.x, player.position.y);
        
        this.graphics.lineTo(player.position.x, player.position.y + player.height);
        this.graphics.lineTo(player.position.x+player.width, player.position.y + player.height);
        this.graphics.lineTo(player.position.x+player.width, player.position.y);
        this.graphics.lineTo(player.position.x, player.position.y);
        
        this.graphics.endFill();
        
        // add drawing as game player component
        this.game.physics.arcade.enable(this.graphics);

        this.graphics.body.velocity.y = 0;
        this.graphics.body.bounce.set(1);
        this.graphics.body.collideWorldBounds = true;

    }
    
    drawRectangle(botLeft: number, topLeft: number, topRight: number, botRight: number, graphics: any){
        
    }
    
    drawBall(ball: Ball){
        
    }
 
    update() {
        // send most-recent-input data to server
        // update data from server
         if (this.game.input.activePointer.leftButton.isDown){
             this.game.state.start("GameOver");
         }
         
         this.graphics.body.velocity.x = 0;
         
         if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
             this.graphics.body.velocity.x = -1*this.speed;
             
         }
         else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
             this.graphics.body.velocity.x = this.speed;
             
         }
         /*
         if (this.cursors.left.isDown)
        {
            //  Move to the left
            
            this.player.body.velocity.x = -150;
    
            
        }
        else if (this.cursors.right.isDown)
        {
            //  Move to the right
            this.player.body.velocity.x = 150;
    
        }
        */
    }
    
    render(){
            this.game.debug.text("Main State: " + this.players,100,100);

    }
}