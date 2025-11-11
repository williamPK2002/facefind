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

  findAll(): Promise<any[]> {
    return this.weaviateService.findAllObjects('deliveries');
  }

  findOne(id: number): Promise<any> {
    return this.weaviateService.getObject('deliveries', id.toString());
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<any> {
    return this.weaviateService.updateObject('deliveries', id.toString(), updateDeliveryDto);
  }

  remove(id: number): Promise<any> {
    return this.weaviateService.deleteObject('deliveries', id.toString());
  }
}
