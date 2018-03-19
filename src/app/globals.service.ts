// globals.service.ts
import { User } from './users/user';
import { Room } from './rooms/room';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Game, AUTO } from 'phaser-ce';
import * as io from 'socket.io-client/dist/socket.io.slim.js';
import { Router } from '@angular/router';

@Injectable()
export class GlobalService {
    
  userInfo: User;
  roomInfo: Room;
  gameInfo: Game;
  socketInfo: any;
  anotherUser: boolean;
  url: string;
  
  constructor(private router: Router){
    this.anotherUser = false;
    var dynamicHost = window.location.hostname;
    var dynamicPort = window.location.port;
    this.url = dynamicHost;
    if(dynamicPort){
      this.url += ":"+ dynamicPort;
    }
  }
  
  storeUserData(user){
    // todo: create socket connection if it doesn't exist
    this.userInfo = user;
    
    if(!this.socketInfo){
      this.socketInfo = io(this.url);
    }
    
    this.socketInfo.emit('user-login', this.userInfo.username);
      
    this.socketInfo.on('get-login-data', () => {
      this.socketInfo.emit('user-login', this.userInfo.username );
    });
    
    this.socketInfo.on('kick', () => {
      this.anotherUser = true;
      console.log('kicked called from server');
      this.router.navigate(['/logout']);
      
    })
    
    
  }
  
}