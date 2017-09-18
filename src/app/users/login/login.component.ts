import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router'
import { GlobalService } from '../../globals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: User;
  
  results: string;

  constructor(private userService: UserService,
              private http: Http,
              private router: Router,
              private globalService: GlobalService) { }

  ngOnInit() {
    if(this.globalService.userInfo){
      this.router.navigate(['/lobby']);
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
        friends: ['']
    };
  }
  
  login(): void {
    
    // verify user info from api
    this.userService.verifyUser(this.user)
      .then(user => {
        // successful verification
        if(user){
          this.user = user
          this.results = 'success';
          this.globalService.userInfo = user;
          this.router.navigate(['/lobby']);
          console.log('success');
        }
        // unsuccessful verification
        else{
          this.results = 'incorrect username/password'
          console.log('fail');
        }
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
