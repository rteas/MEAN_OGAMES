import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { RoomService } from '../room.service';
import { GlobalService } from '../../globals.service';
import { Room } from '../room';
import { User } from '../../users/user';
import { Router } from '@angular/router'


@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit {
  
  room: Room;
  user: User;
  
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService,
              public roomService: RoomService,
              public globalService: GlobalService,
              private router : Router) {}

  ngOnInit() {
    this.user = this.globalService.userInfo;
      this.room = {
            _id: '',
            name: '',
            population: 1,
            password: '',
            owner: '',
            users: [''],
            public: true
      };
  }
  
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  public createRoom():void{
    this.roomService.createRoom(this.room, this.user._id)
    .then(room => {
        if(room){
          console.log(room._id);
          this.router.navigate(['/rooms/'+room._id])
        }
    });

  }

}
