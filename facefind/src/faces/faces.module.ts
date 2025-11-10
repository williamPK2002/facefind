import { Module } from '@nestjs/common';
import { FacesService } from './faces.service';
import { FacesController } from './faces.controller';

@Module({
  controllers: [FacesController],
  providers: [FacesService],
})
export class FacesModule {}
