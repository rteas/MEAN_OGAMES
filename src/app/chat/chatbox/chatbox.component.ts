import { Component, Input, ViewChild, ElementRef, AfterContentInit, OnInit } from '@angular/core';
import { User } from '../../users/user';
import { ChatService } from '../chat.service';
declare var $: any;

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit, AfterContentInit  {
  
  @ViewChild('msg') msg: ElementRef
  
  @Input() user: User;
  @Input() users: User[];
  message: string;
  chatboxHeight: number;
  chatbodyHeight: number;
  usersHeight: number;
  resizeInProgress: boolean = false;
  scrolledDown: boolean = true;
  sendable: boolean = false;
  buttonClass: string;
  
  constructor(public chatService: ChatService) { }
  
  ngOnInit(){
    this.buttonClass = "btn-outline-secondary";
    this.message="";
  }

  ngAfterContentInit() {
    this.msg.nativeElement.focus();
    $(document).ready(this.resizeChatBox());
    
    $(".chatbox-div").scroll(()=>{
      console.log('scroll detected');
      // check if the scroller is at the bottom
      let scrollMax = $('.chatbox-div')[0].scrollTop;
      console.log('current scroll: ' + scrollMax);
      let scrollHeight = $('.chatbox-div')[0].scrollHeight;
      console.log('Scroll Height: ' + scrollHeight);
      let clientHeight = $('.chatbox-div')[0].clientHeight;
      console.log('Client Height: ' + clientHeight);
      let offsetHeight = $('.chatbox-div')[0].offsetHeight;
      console.log('Offset Height: ' + offsetHeight);
      
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
    console.log('scroll detected');
  }
  
  joinRoom(roomName: string){
    this.chatService.joinRoom(roomName);
  }
  
  sendMessage(message: string){
    this.chatService.sendMessage(message);
    this.message = "";
  }
  
  messageSendable(): boolean{
    if(this.message.length > 0){
      this.sendable = true;
    }
    else{
      this.sendable = false;
    }
    return this.sendable;
  }
  
  keyHandler(event) {
    // Sends message on enter key
    if(event.key === "Enter" && this.sendable){
      this.sendMessage(this.message);
    }
  } 

}
