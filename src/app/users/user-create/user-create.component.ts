import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: User;

  constructor() { }

  ngOnInit() {
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

}
