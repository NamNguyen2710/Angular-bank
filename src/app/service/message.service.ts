import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string[] = [];

  constructor() { }

  addMessage(msg: string) {
    this.message.push(msg);
  }
  
  clearMessage() {
    this.message = [];
  }
}
