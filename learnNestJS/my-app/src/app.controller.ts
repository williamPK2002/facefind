import { Controller, Get, Param, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
}

//A simple controller that handles HTTP GET requests and returns a greeting message: