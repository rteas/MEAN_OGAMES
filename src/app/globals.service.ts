// globals.service.ts
import { User } from './users/user';
import { Room } from './rooms/room';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Game, AUTO } from 'phaser-ce';

@Injectable()
export class GlobalService {
    
  userInfo: User;
  roomInfo: Room;
  gameInfo: Game;
  
}