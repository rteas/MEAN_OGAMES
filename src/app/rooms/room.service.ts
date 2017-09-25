import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Room } from './room';
import { User } from '../users/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoomService {
    private roomsUrl = '/api/rooms';
    private headers = new Headers({'Content-Type': 'application/json'});
    
    

  constructor(private http: Http) { }
  
  private handleError(error: any): Promise<any>{
      console.error('An error has occurred', error);
      return Promise.reject(error.message || error);
  }
  
  getRooms(): Promise<void | Room[]> {
      return this.http.get(this.roomsUrl)
                 .toPromise()
                 .then(response => response.json() as Room[])
                 .catch(this.handleError);
  }
  
  // adds user id to room, updates room count
  addUserToRoom(room: Room, user: User): Promise<void | Room> {
      const apiUrl = this.roomsUrl+'/'+room._id+'/addUser';
      return this.http.put(apiUrl, user, this.headers)
                        .toPromise()
                        .then(response => response.json() as Room)
                        .catch(this.handleError);
  }
  

  
  removeUserFromRoom(room: Room, user: User): Promise<void> {
      const apiUrl = this.roomsUrl+'/'+room._id+'/removeUser';
      return this.http.put(apiUrl, user, this.headers)
                        .toPromise()
                        .then(response => response.json() as Room)
                        .catch(this.handleError);
  }
  
  getRoom(id: string): Promise<Room> {
      const apiUrl = this.roomsUrl+'/'+id;
      return this.http.get(apiUrl)
                    .toPromise()
                    .then(response => response.json() as Room)
                    .catch(this.handleError);
      
  }
  
  createRoom(room: Room, userId: String): Promise<void | Room>{
      const apiUrl = this.roomsUrl+'/'+room._id+'/create';
      var roomParams = { name: room.name, password: room.password, user: userId };
      return this.http.post(apiUrl, roomParams, this.headers)
                    .toPromise()
                    .then(response => response.json() as Room)
                    .catch(this.handleError);
  }
  
  deleteRoom(room: Room): Promise<void>{
      const apiUrl = this.roomsUrl+'/'+room._id+'/delete';
      return this.http.post(apiUrl, this.headers)
                        .toPromise()
                        .then(response => response.json())
                        .catch(this.handleError);
  }
  
    
}
