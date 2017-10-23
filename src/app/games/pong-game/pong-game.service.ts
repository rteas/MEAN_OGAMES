import { Injectable } from '@angular/core';
import * as io from 'socket.io/node_modules/socket.io-client';
import { GlobalService } from '../../globals.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PongGameService {
  
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

}
