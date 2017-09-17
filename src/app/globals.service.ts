// globals.service.ts
import { User } from './users/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GlobalService {
  userInfo: User;
  
}