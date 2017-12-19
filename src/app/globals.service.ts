// globals.service.ts
import { User } from './users/user';
import { Room } from './rooms/room';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Game, AUTO } from 'phaser-ce';
import * as io from 'socket.io-client/dist/socket.io.slim.js';

@Injectable()
export class GlobalService {
    
  userInfo: User;
  roomInfo: Room;
  gameInfo: Game;
  socketInfo: any;
  
  saveUserData(){
    if(this.socketInfo){
      this.socketInfo.on('get-userdata', () => {
        this.socketInfo.emit('userdata', this.userInfo );
      });
    }
      
  }
  
}