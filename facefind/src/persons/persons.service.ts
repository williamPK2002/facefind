import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { WeaviateService } from 'src/weaviate/weaviate.service';


@Injectable()
export class PersonsService {
  constructor(private readonly weaviateService: WeaviateService) {}
  create(createPersonDto: CreatePersonDto) {
    return this.weaviateService.createObject('persons', createPersonDto);
  }

  findAll(): Promise<any[]> {
    return this.weaviateService.findAllObjects('persons');
  }

  findOne(id: number): Promise<any> {
    return this.weaviateService.getObject('persons', id.toString());
  }

  update(id: number, updatePersonDto: UpdatePersonDto): Promise<any> {
    return this.weaviateService.updateObject('persons', id.toString(), updatePersonDto);
  }

  remove(id: number): Promise<any> {
    return this.weaviateService.deleteObject('persons', id.toString());
  }
}
