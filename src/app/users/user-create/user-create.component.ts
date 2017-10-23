import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { UserService } from '../user.service';
import { GlobalService } from '../../globals.service';

import { User } from '../user';
import { Router } from '@angular/router'


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: User;
  public modalRef: BsModalRef;
  
  constructor(private modalService: BsModalService,
              public userService: UserService,
              public globalService: GlobalService,
              private router : Router) {}
  
  

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
  
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  public createUser():void{
    this.userService.createUser(this.user)
    .then(user => {
        if(user){
          this.globalService.userInfo = user;
          this.router.navigate(['/lobby'])
        }
        else{
          //TODO: proper error message
          console.log('username already exists');
        }
    });
  }

}
