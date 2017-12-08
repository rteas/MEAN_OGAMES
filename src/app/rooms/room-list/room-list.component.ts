import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { User } from '../../users/user';
import { RoomService } from '../room.service';
import { UserService } from '../../users/user.service';
import { GlobalService } from '../../globals.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

/*
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { switchMap } from 'rxjs/operator/switchMap';
*/

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import 'rxjs/add/operator/switchMap';

import { FormControl } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  user: User;
  rooms: Room[];
  selectedRoom: Room;
  
  roomListHeight: number;
  resizeInProgress: boolean;
  
  searchTerm: string;
  searchTerms = new Subject<string>();
  
  hasSearchInput: boolean;
  loading: boolean;
  searchField: FormControl;
  
  rooms$: Observable<Room[]>;
  
  searchRooms$: Subscription;
  
  constructor(private roomService: RoomService,
              private globalService: GlobalService,
              private userService: UserService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService) { }
  
  ngOnInit() {
    // Searches for rooms
    // if there is input, run a search
    // else return the default results
    this.loading = false;
    this.hasSearchInput = false;
    this.searchField = new FormControl();
    this.searchField.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .do( () =>this.spinnerService.show() )
        .switchMap( term => {
          this.searchTerm = term;
          if(term.length > 0){
            this.hasSearchInput = true;
            return this.roomService.searchRoom(term)
          }
          else{
            this.hasSearchInput = false;
            return Observable.of([]);
          }
          
        })
        .subscribe( results => {
          this.loading = false;
          
          if(this.hasSearchInput){
            this.rooms = results
          }
          else{
            this.getRooms();
          }
          
        });
        
    
    this.getRooms();
    this.resizeInProgress = false;
    this.searchTerm = "";
    this.user = this.globalService.userInfo;
    
    $(document).ready(this.setRoomHeight());
    /*
    this.rooms$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.roomService.searchRoom(term))
      );
    */
  }
  
  getRooms(){
    this.roomService
        .getRooms()
        .then((rooms: Room[]) => {
          this.rooms = rooms.map((room) => {
            return room;
          });
        });
  }
  
  searchRoom(term: string){
    this.roomService.searchRoom(term);
  }
  
  resizeRoomList(){
    if(this.resizeInProgress) return;
    this.resizeInProgress=true;
    setTimeout(()=>{
      this.setRoomHeight();
      this.resizeInProgress = false;
    }, 250);
  }
  
  isSearching(): boolean{
    return this.searchTerm.length > 0;
  }
  
  search(term: string){
    this.searchTerm = term;
  }
  
  setRoomHeight(){
    var body = document.body,
    html = document.documentElement;

    var windowHeight = $(window).height();
    
    var titleHeight = $('#roomlist-title').offset().top + $('#roomlist-title').outerHeight(true);
    var roomControlHeight = $('#roomlist-controls').outerHeight();
    
    this.roomListHeight = windowHeight - (titleHeight + 2*roomControlHeight);
    
  }
  
  deleteRoom(room: Room): void{
    this.roomService.deleteRoom(room)
        .then(()=> {
          this.roomService
          .getRooms()
          .then((rooms: Room[]) => {
            this.rooms = rooms.map((room) => {
              return room;
            });
          });
          this.setRoomHeight();
        });
  }

}
