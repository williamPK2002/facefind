import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { WeaviateService } from 'src/weaviate/weaviate.service';

@Injectable()
export class DeliveriesService {
  constructor(private readonly weaviateService: WeaviateService) {}
  create(createDeliveryDto: CreateDeliveryDto) {
    return this.weaviateService.createObject('deliveries', createDeliveryDto);
  }

  findAll() {
    return this.weaviateService.findAllObjects('deliveries');
  }

  findOne(id: number) {
    return this.weaviateService.getObject('deliveries', id.toString());
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return this.weaviateService.updateObject('deliveries', id.toString(), updateDeliveryDto);
  }

  remove(id: number) {
    return this.weaviateService.deleteObject('deliveries', id.toString());
  }
}
