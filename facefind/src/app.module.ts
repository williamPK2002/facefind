import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeaviateModule } from './weaviate/weaviate.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { PhotosModule } from './photos/photos.module';
import { FacesModule } from './faces/faces.module';
import { PersonsModule } from './persons/persons.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { AbuseReportsModule } from './abuse_reports/abuse_reports.module';

@Module({
  imports: [WeaviateModule, ConfigModule.forRoot({ isGlobal: true }), EventsModule, PhotosModule, FacesModule, PersonsModule, DeliveriesModule, AbuseReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
