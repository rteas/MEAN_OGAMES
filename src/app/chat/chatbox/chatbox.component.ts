import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../users/user';
import { ChatService } from '../chat.service';
declare var $: any;

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  
  @Input() user: User;
  @Input() users: User[];
  message: string;
  chatboxHeight: number;
  usersHeight: number;
  resizeInProgress: boolean = false;
  
  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.chatService.join(this.user.username);
    this.setChatBoxHeight();
  }
  
  resizeChatBox(){
   //alert($(window).height());
    if(this.resizeInProgress) return;
    this.resizeInProgress=true;
    setTimeout(()=>{
      this.setChatBoxHeight();
      this.resizeInProgress = false;
      console.log('timeout exected!');
    }, 250);
    
  }
  
  setChatBoxHeight(){
    var body = document.body,
    html = document.documentElement;

    var windowHeight = $(window).height();
    
    var titleHeight = $('#chatbox-title').offset().top + $('#chatbox-title').outerHeight(true);
    var chatInputHeight = $('#chat-input').outerHeight();
    
    this.chatboxHeight = windowHeight - (titleHeight + 2*chatInputHeight);
    
  }
  
  joinRoom(roomName: string){
    this.chatService.joinRoom(roomName);
  }
  
  sendMessage(){
    if(this.message){
      // TODO: clean the message
      if(this.message.length > 0){
        console.log(this.message.length);
        this.chatService.sendMessage(this.message);
        this.message = "";
      }
    }
  }
  
  keyHandler(event) {
    // Sends message on enter key
    if(event.key === "Enter"){
      this.sendMessage();
    }
  } 

}
