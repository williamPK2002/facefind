import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { WeaviateService } from 'src/weaviate/weaviate.service';

@Injectable()
export class PhotosService {
  constructor(private readonly weaviateService: WeaviateService) {}
  create(createPhotoDto: CreatePhotoDto) {
    return this.weaviateService.createObject('photos', createPhotoDto);
  }

  findAll(): Promise<any[]> {
    return this.weaviateService.findAllObjects('photos');
  }

  findOne(id: number): Promise<any> {
    return this.weaviateService.getObject('photos', id.toString());
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<any> {
    return this.weaviateService.updateObject('photos', id.toString(), updatePhotoDto);
  }

  remove(id: number): Promise<any> {
    return this.weaviateService.deleteObject('photos', id.toString());
  }
}
