import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { TaskModule } from './task/task.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [TasksModule, DatabaseModule, TaskModule, 
  ThrottlerModule.forRoot([{
    name: 'long',
    ttl: 60000, // 1 minute
    limit: 10,  // 10 requests per minute
  },{
    name: 'short',
    ttl: 1000, // 1 second
    limit: 3,   // 3 requests per second
  }] ), MyLoggerModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
    //this applies the rate limiting guard globally
    // you can also apply it to specific controllers or routes if you want
  }],
})
export class AppModule {}

//The root module. It ties together controllers and providers: