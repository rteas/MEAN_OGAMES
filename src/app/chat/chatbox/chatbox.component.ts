import { Component, Input, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { User } from '../../users/user';
import { ChatService } from '../chat.service';
declare var $: any;

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements AfterContentInit  {
  
  @ViewChild('msg') msg: ElementRef
  
  @Input() user: User;
  @Input() users: User[];
  message: string;
  chatboxHeight: number;
  chatbodyHeight: number;
  usersHeight: number;
  resizeInProgress: boolean = false;
  scrolledDown: boolean = true;
  
  constructor(public chatService: ChatService) { }

  ngAfterContentInit() {
    this.msg.nativeElement.focus();
    $(document).ready(this.resizeChatBox());
    
    // Add watcher for scroller
    $('#messages-box').scroll(()=>{
      console.log('scroll detected');
      // check if the scroller is at the bottom
      let scrollHeight = $('messages-box').scrollHeight();
      console.log('current scroll: ' + scrollHeight);
      let scrollMax = $('messages-box').scrollTop();
      console.log('scroll top: ' + scrollMax);
    });
  }
  
  resizeChatBox(){
   //alert($(window).height());
    if(this.resizeInProgress) return;
    this.resizeInProgress=true;
    setTimeout(()=>{
      this.setChatBoxHeight();
      this.setBodyHeight();
      this.resizeInProgress = false;
      console.log('timeout exected!');
      console.log('container-height: '+ this.chatboxHeight);
      console.log('body-height: '+ this.chatbodyHeight)
    }, 250);
    
  }
  
  setChatBoxHeight(){

    var windowHeight = $(window).height();
    
    var titleHeight = $('#chatbox-title').offset().top + $('#chatbox-title').outerHeight(true);
    var chatInputHeight = $('#chat-input').outerHeight();
    
    this.chatboxHeight = windowHeight - (titleHeight + 2*chatInputHeight);
    //this.setBodyHeight();
    
  }
  
  setBodyHeight(){
    this.chatbodyHeight = this.chatboxHeight - $('.chatbox-header').outerHeight();
  }
  
  scrollChatDown(){
 
  }
  
  joinRoom(roomName: string){
    this.chatService.joinRoom(roomName);
  }
  
  sendMessage(){
    if(this.message){
      // TODO: clean the message
      if(this.message.length > 0){
        
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
