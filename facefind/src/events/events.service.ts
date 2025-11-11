import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { WeaviateService } from 'src/weaviate/weaviate.service';

@Injectable()
export class EventsService {
  constructor(private readonly weaviateService: WeaviateService) {}
  create(createEventDto: CreateEventDto) {
    return this.weaviateService.createObject('events', createEventDto);
  }

  findAll(): Promise<any[]> {
    return this.weaviateService.findAllObjects('events');
  }

  findOne(id: number): Promise<any> {
    return this.weaviateService.getObject('events', id.toString());
  }

  update(id: number, updateEventDto: UpdateEventDto): Promise<any> {
    return this.weaviateService.updateObject('events', id.toString(), updateEventDto);
  }

  remove(id: number): Promise<any> {
    return this.weaviateService.deleteObject('events', id.toString());
  }
}
