import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test')
  async testPost(@Body() message: string): Promise<string> {
    return this.appService.testPost(message);
  }

  @Get('test/:id')
  async testGet(@Param('id') id: string): Promise<string> {
    return this.appService.testGet(id);
  }

  @Post('test-embed')
  async testEmbed(@Body() message: string, imgPath: string): Promise<string> {
    return this.appService.testEmbed(message, imgPath);
  }

}
