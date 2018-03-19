import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { GlobalService } from '../../globals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: User;
  
  results: string;
  errors: string[] = [];

  constructor(private userService: UserService,
              private http: Http,
              private router: Router,
              private globalService: GlobalService) { }

  ngOnInit() {
    
    if(this.globalService.userInfo){
      this.router.navigate(['/lobby']);
    }
    if(this.globalService.anotherUser){
      alert("Another user has logged into this account \n NOTE: There can only be one user logged in per account");
      this.globalService.anotherUser = false;
    }
    this.initializeUser();
  }
  
  initializeUser(): void{

    this.user = {
        _id: '',
        username: '',
        password: '',
        topScore: 0,
        status: '',
        location: '',
        locationName: '',
        friends: ['']
    };
  }
  
  login(): void {
    
    // verify user info from api
    this.userService.loginUser(this.user)
      .then(user => {
        // successful verification
        if(user){
          this.user = user
          this.results = 'success';
          this.globalService.storeUserData(user);
          this.router.navigate(['/lobby']);
          console.log('success');
          // change user status to online
          
        }
        // unsuccessful verification
        else{
          this.results = 'incorrect username/password';
          console.log('fail');
        }
      })
      .catch(error => {
        console.log(error);
        var json = JSON.parse(error._body);
        var error = json.error;
        this.errors.push(error);
      });
    
  }
  
  create(): void {
    this.userService.createUser(this.user)
      .then(user => {
        if(user){
          this.results = 'User created successfully';
          console.log('User created successfully');
        }
        else{
          this.results = 'Username already exists';
          console.log('Username already exists');
        }
      })
  }

}
