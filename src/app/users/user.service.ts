import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from './user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private usersUrl = '/api/users';
    private headers = new Headers({'Content-Type': 'application/json'});
    
    currentUser: User;

  constructor(private http: Http) { }
  
  private handleError(error: any): Promise<any>{
      console.error('An error has occurred', error);
      return Promise.reject(error.message || error);
  }
  
  getUsers(): Promise<void | User[]> {
      return this.http.get(this.usersUrl)
                 .toPromise()
                 .then(response => response.json() as User[])
                 .catch(this.handleError);
  }
  
  loginUser(user: User): Promise<User>{
      return this.http.post(this.usersUrl+'/login', {username: user.username, password: user.password})
                    .toPromise()
                    .then(response => response.json() as User);
  }
  
  createUser(user: User): Promise<User> {
      return this.http.post(this.usersUrl+'/create', {username: user.username, password: user.password})
                    .toPromise()
                    .then(response => response.json() as User)
                    .catch(this.handleError);
  }
  
  getUser(id: string): Promise<User> {
      return this.http.get(this.usersUrl+'/'+id)
                    .toPromise()
                    .then(response => response.json() as User)
                    .catch(this.handleError);
  }
    
}
