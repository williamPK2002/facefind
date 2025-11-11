import { Injectable } from '@nestjs/common';
import { CreateFaceDto } from './dto/create-face.dto';
import { UpdateFaceDto } from './dto/update-face.dto';
import { WeaviateService } from 'src/weaviate/weaviate.service';

@Injectable()
export class FacesService {
  constructor(private readonly weaviateService: WeaviateService) {}
  create(createFaceDto: CreateFaceDto) {
    return this.weaviateService.createObject('faces', createFaceDto);
  }

  findAll(): Promise<any[]> {
    return this.weaviateService.findAllObjects('faces');
  }

  findOne(id: number): Promise<any> {
    return this.weaviateService.getObject('faces', id.toString());
  }

  update(id: number, updateFaceDto: UpdateFaceDto): Promise<any> {
    return this.weaviateService.updateObject('faces', id.toString(), updateFaceDto);
  }

  remove(id: number): Promise<any> {
    return this.weaviateService.deleteObject('faces', id.toString());
  }
}
