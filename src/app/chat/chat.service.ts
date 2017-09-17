import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Http } from '@angular/http';

@Injectable()
export class ChatService {
    
    socket: any;
    message: string = "";
    messages: string[] = [];
    username: string;
    url: string = 'http://slots-party-rteas-1.c9users.io:8080';
    
    
  constructor() {
    
  }
  
  join(username: string): void{
      this.username = username;
      this.socket = io(this.url);
      this.socket.emit('user login', username);
      this.socket.on('greetings', (msg) => {
          console.log('connected.', msg);
      });
      
      this.socket.on('user login', (username) => {
          this.messages.push(username+ " has joined!")
      })
      
      this.socket.on('message', msg => {
          this.messages.push(msg);
      });
      
      /*
      var roomName = "/testnamespace";
      let newSocket = io(this.url+roomName);

      console.log(this.socket);
      console.log(newSocket);
      */
      
    }
  
  
  joinRoom(roomName: string): void {
      this.socket.emit('join room', roomName);
      console.log('joining room...',roomName);
      this.socket.on(roomName, (msg) => {
          console.log(msg);
      })
  }
  
  sendMessage(message: string): void {
      this.socket.emit('message', this.username+": "+message);
  }
  
  /*
  listen(event: string): Observable<any> {
      return new Observable(observer => {
          this.socket.on(event, data => {
              observer.next(data);
          });
          
          
      });
  }
  */

}
