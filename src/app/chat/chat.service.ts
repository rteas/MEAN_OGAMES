import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from '../globals.service';
import * as io from 'socket.io/node_modules/socket.io-client';
import { Http } from '@angular/http';
import { User } from '../users/user';
import { UserService } from '../users/user.service';

@Injectable()
export class ChatService {
    private usersUrl = '/api/users';
    
    socket: any;
    message: string = "";
    messages: string[] = [];
    username: string;
    chatLocation: string;

    url: string;
    dynamicHost: string;
    dynamicPort: string;
    
  constructor(public globalService: GlobalService,
              private http: Http,
              private userService: UserService) {
    this.dynamicHost = window.location.hostname;
    this.dynamicPort = window.location.port;
    this.url = this.dynamicHost;
    if(this.dynamicPort){
      this.url += ":"+this.dynamicPort;
    }
  }
  
  private handleError(error: any): Promise<any>{
      console.error('An error has occurred', error);
      return Promise.reject(error.message || error);
  }
  
  join(username: string): void{
      this.username = username;
      
      if(!this.globalService.socketInfo){
        this.socket = io(this.url);
        this.socket.emit('user-login', username);
        this.globalService.socketInfo = this.socket;
      }
      else{
        this.socket = this.globalService.socketInfo;
      }
      
      this.socket.on('greetings', (msg) => {
          console.log('connected.', msg);
      });
      
      
      /*
      this.socket.on('message', msg => {
          this.messages.push(msg);
      });
      */
      
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
  
  getUsers(): Promise<void | User[]>{
    if(this.chatLocation==="lobby") return this.getLobbyUsers();
    else return this.getRoomUsers();
  }
  
  // TODO: More optimized
  getRoomUsers(): Promise<void | User[]> {
    return this.http.get(this.usersUrl+'?location='+this.chatLocation)
                 .toPromise()
                 .then(response => response.json() as User[])
                 .catch(this.handleError);
  }
  // TODO: More optimized 
  getLobbyUsers(): Promise<void | User[]> {
    return this.http.get(this.usersUrl+'?status=Online')
                 .toPromise()
                 .then(response => response.json() as User[])
                 .catch(this.handleError);
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
