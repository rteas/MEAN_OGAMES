import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Room } from './room';
import { User } from '../users/user';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
//import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoomService {
    private roomsUrl = '/api/rooms';
    private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http,
              private httpClient: HttpClient) { }
  
  private handleError(error: any): Promise<any>{
      console.error('An error has occurred', error);
      return Promise.reject(error.message || error);
  }
  
  getRooms(): Promise<void | Room[]> {
      return this.http.get(this.roomsUrl)
                 .toPromise()
                 .then(response => {
                     //console.log(response.json() as Room[]);
                     return response.json() as Room[];
                 })
                 .catch(this.handleError);
  }
  
  // adds user id to room, updates room count
  addUserToRoom(room: Room, user: User): Promise<void | Room> {
      const apiUrl = this.roomsUrl+'/'+room._id+'/addUser';
      var data = { user_id: user._id, room_password: room.password }
      return this.http.put(apiUrl, data, this.headers)
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
                    .then(response => {
                        //console.log(response.json() as Room);
                        return response.json() as Room;})
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
  
  deleteRoom(room: Room): Promise<void | Room>{
      const apiUrl = this.roomsUrl+'/'+room._id+'/delete';
      return this.http.get(apiUrl)
                        .toPromise()
                        .catch(this.handleError);
  }
  
  // searches for room by name
  // https://angular.io/tutorial/toh-pt6#search-by-name
  searchRoom(term: string): Observable<Room[]> {
    // return empty array if search is only spaces
    if(!term.trim()){
      return of([]);
    }
    const apiUrl = this.roomsUrl+'?name='+term;
    //return this.http.get<Room[]>(apiUrl);
    return this.httpClient.get<Room[]>(apiUrl)
  }
  
}
