import { Component, Input, ViewChild, ElementRef, AfterContentInit, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../users/user';
import { ChatService } from '../chat.service';
import { Subscription } from 'rxjs/Subscription';
declare var $: any;

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit, AfterContentInit, OnDestroy{
  
  @ViewChild('msg') msg: ElementRef
  
  @Input() user: User;
  users: User[];
  message: string;
  chatboxHeight: number;
  chatbodyHeight: number;
  usersHeight: number;
  resizeInProgress: boolean = false;
  scrolledDown: boolean = true;
  sendable: boolean = false;
  buttonClass: string;
  currentScroll: number;
  message$: Subscription;
  info$: Subscription;
  
  constructor(public chatService: ChatService,
              private elementRef: ElementRef) {}
  
  ngOnInit(){
    
    // get users
    this.getUsers();
    
    this.buttonClass = "btn-outline-secondary";
    this.message="";
    this.currentScroll = 0;
    this.message$ = this.chatService.listen('message').subscribe((data)=>{
        console.log('message received: ' + data);
        this.addMessage(data);
      });
    this.info$ = this.chatService.listen('info').subscribe((data) => {
      this.addMessage(data);
      this.getUsers();
    });
    
    var messages = this.chatService.getMessages();
    console.log('messages');
    console.log(messages);
    for(var i = 0; i < messages.length; i++){
      this.addMessage(messages[i]);
    }
  }
  
  getUsers(){
    this.chatService
        .getUsers()
        .then((users: User[]) => {
          this.users = users.map((user) => {
            if(!user.friends){
              user.friends = [];
            }
            if(!user.location){
              user.location = 'unknown';
            }
            return user;
          });
        });
  }

  ngAfterContentInit() {
    this.msg.nativeElement.focus();
    $(document).ready(this.resizeChatBox());
    
    $(".chatbox-div").scroll(()=>{
      console.log('scroll detected');
      // check if the scroller is at the bottom
      let scrollTop = $('.chatbox-div')[0].scrollTop;
      let scrollDownMax = $('.chatbox-div')[0].scrollHeight;
      let clientHeight = $('.chatbox-div')[0].clientHeight;
      let offsetHeight = $('.chatbox-div')[0].offsetHeight;
      
      console.log('Scroll Top: ' + scrollTop);
      console.log('Scroll Height: ' + scrollDownMax);
      console.log('Client Height: ' + clientHeight);
      console.log('Offset Height: ' + offsetHeight);
      
      this.currentScroll = scrollTop+offsetHeight;
      
      this.scrolledDown = (this.currentScroll === scrollDownMax);
      
      console.log("Current Scroll: "+ this.currentScroll);
    });
  }
  
  ngOnDestroy(){
    if(this.message$){
      this.message$.unsubscribe();
    }
    if(this.info$){
      this.info$.unsubscribe();
    }
    
  }
  /*
  ngDoCheck(){
    let scrollHeight = $('.chatbox-div')[0].scrollHeight;
    if(this.scrolledDown && this.currentScroll < scrollHeight){
      this.scrollToBottom();
    }
  }
  */
  
  addMessage(message: string){
    this.chatService.storeMessage(message);
    var msg = $("<li>", {"class": "message"});
    msg.text(message);
    $('.msg-list').append(msg);
    if(this.scrolledDown){
      this.scrollToBottom();
    }
  }
  
  resizeChatBox(){
   //alert($(window).height());
    if(this.resizeInProgress) return;
    this.resizeInProgress=true;
    setTimeout(()=>{
      this.setChatBoxHeight();
      this.setBodyHeight();
      if(this.scrolledDown){
        this.scrollToBottom();
      }
      this.resizeInProgress = false;
    }, 250);
    
  }
  
  setChatBoxHeight(){
    let windowHeight = $(window).height();
    
    let titleHeight = $('#chatbox-title').offset().top + $('#chatbox-title').outerHeight(true);
    let chatInputHeight = $('#chat-input').outerHeight();
    
    this.chatboxHeight = windowHeight - (titleHeight + 2*chatInputHeight);
  }
  
  setBodyHeight(){
    this.chatbodyHeight = this.chatboxHeight - $('.chatbox-header').outerHeight();
  }
  
  scrollToBottom(){
    $('.chatbox-div')[0].scrollTop = $('.chatbox-div')[0].scrollHeight;
  }
  
  joinRoom(roomName: string){
    this.chatService.joinRoom(roomName);
  }
  
  sendMessage(message: string){
    if(this.sendable) this.chatService.sendMessage(message);
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
