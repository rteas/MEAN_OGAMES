import { Component, Input, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { GlobalService } from '../../globals.service';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { User } from '../../users/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-join',
  templateUrl: './room-join.component.html',
  styleUrls: ['./room-join.component.css']
})
export class RoomJoinComponent implements OnInit {

  private modalRef: BsModalRef;
  @Input() room: Room;
  user: User;
  error: string;
  
  constructor(private modalService: BsModalService,
              private globalService: GlobalService,
              private roomService: RoomService,
              private router: Router) { }
  
  ngOnInit() { 
    this.user = this.globalService.userInfo;
    // must intialize password to default 'no password'
    this.room.password = '';
  }
  
  // TODO: Serverside - implement private option
  // Attempts to join room
  // If a password is needed, prompt password form
  public joinRoom(template: TemplateRef<any>){
    //console.log(this.room.password?);
    
    if(this.room.public === true){
      this.enterRoom(this.room, this.user);
    }
    else{
      this.openModal(template);
    }
    
    
  }
  
  public enterRoom(room: Room, user: User){
    // console.log('ENTERING ROOM:'+ room._id);
    
    this.roomService
    .addUserToRoom(room, user)
    .then((room) => {
      
      if(room){
        if(this.modalRef){
          this.modalRef.hide();
        }
        this.globalService.roomInfo = room;
        this.router.navigate(['/rooms/'+room._id]);
        
      }
      else{
        this.error = "incorrect password";
      }
      
    });
    
  }
  
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
