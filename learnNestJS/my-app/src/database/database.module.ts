import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

//Making everything global is not a good practice. Prefer importing the module where needed.
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
