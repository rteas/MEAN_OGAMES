import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io/node_modules/socket.io-client';
import { Http } from '@angular/http';

@Injectable()
export class ChatService {
    
    socket: any;
    message: string = "";
    messages: string[] = [];
    username: string;
    chatLocation: string;
    //url: string = 'http://slots-party-rteas-1.c9users.io:8080';
    //url: string='https://dry-sea-96961.herokuapp.com/';
    url: string;
    dynamicHost: string;
    dynamicPort: string;
    
  constructor() {
    this.dynamicHost = window.location.hostname;
    this.dynamicPort = window.location.port;
    this.url = this.dynamicHost;
    if(this.dynamicPort){
      this.url += ":"+this.dynamicPort;
    }
  }
  
  join(username: string): void{
      this.username = username;
      this.socket = io(this.url);
      this.socket.emit('user-login', username);
      this.socket.on('greetings', (msg) => {
          console.log('connected.', msg);
      });
      
      this.socket.on('user-login', (username) => {
          this.messages.push(username+ " has joined!")
      });
      
      this.socket.on('message', msg => {
          this.messages.push(msg);
      });
      
      this.socket.on('disconnect', msg => {
          console.log(msg);
          this.messages.push(msg+ " left");
      });
      
    }
  
  
  joinRoom(roomName: string): void {
      this.socket.emit('join room', roomName);
      console.log('joining room...',roomName);
      this.socket.on(roomName, (msg) => {
          console.log(msg);
      })
  }
  
  switchChatLocation(location: string){
    if(location.length > 0){
      this.chatLocation = location;
    }
    else{
      this.chatLocation="lobby";
    }
  }
  
  sendMessage(message: string): void {

      if(this.chatLocation === "lobby" || !this.chatLocation){
          this.socket.emit('message', '['+this.chatLocation+'] '+this.username+": "+message);
      }
      else{
          this.sendRoomMessage(this.chatLocation, '['+this.chatLocation+'] '+this.username+": "+message);
      }
      
  }
  
  sendRoomMessage(room: string, message: string){
      var data = { message: message, room: room }
      this.socket.emit('room-message', data);
      
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
