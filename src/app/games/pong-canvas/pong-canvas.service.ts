import { Injectable } from '@angular/core';
import * as io from 'socket.io-client/dist/socket.io.slim.js';
import { GlobalService } from '../../globals.service';
import { Observable } from 'rxjs/Observable';

// Pong service should do two main in general
// 1: Send user input data
// 2: Get current gamestate data

// Three cases:
// 1: lobby/setup/sync
// 2: game-start
// 3: game-over

@Injectable()
export class PongCanvasService {
    
  socket: any;
  
  url: string;
  dynamicHost: string;
  dynamicPort: string;
  
  constructor(private globalService: GlobalService) {
    // Create socket connection if it isn't available
    if(!this.globalService.socketInfo)
    {
      this.dynamicHost = window.location.hostname;
      this.dynamicPort = window.location.port;
      this.url = this.dynamicHost;
      
      if(this.dynamicPort){
        this.url += ":"+this.dynamicPort;
      }
      this.socket = io(this.url);
        this.socket.emit('user-login', globalService.userInfo.username);
        this.globalService.socketInfo = this.socket;
    }
    else
    {
      this.socket = this.globalService.socketInfo;
    }
  }
  
  listen(event: string): Observable<any> {

    return new Observable(observer => {

      this.socket.on(event, data => {
        observer.next(data);
      });

      // observable is disposed
      return () => {
        this.socket.off(event);
      }

    });

  }
  
  removePongGameServerListeners(){
    this.socket.emit('leave-game');
  }
  
  
  stopPongGame(){
    this.socket.emit('close-game');
  }
  
  emitGameData(event: string, data: any){

    //console.log(sendData);
    this.socket.emit(event, data);
  }

}
