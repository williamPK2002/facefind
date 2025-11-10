import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  private messages = {"1":"Hello World, I am william!","2":"Hello World, I am john!"};
  private counter = 2;

  getMessage(id): string {
    if(!this.messages[id]){
      throw new NotFoundException('Message not found');
    }
    return this.messages[id];
  }

  getAllMessages(): object {
    return this.messages;
  }

  postMessage(message: string) {
    this.counter += 1;
    this.messages[this.counter] = message;
  }
}

//A simple service that provides a greeting message: