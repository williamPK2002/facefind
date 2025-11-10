import { Injectable } from '@nestjs/common';
import { CreateFaceDto } from './dto/create-face.dto';
import { UpdateFaceDto } from './dto/update-face.dto';

@Injectable()
export class FacesService {
  create(createFaceDto: CreateFaceDto) {
    return 'This action adds a new face';
  }

  findAll() {
    return `This action returns all faces`;
  }

  findOne(id: number) {
    return `This action returns a #${id} face`;
  }

  update(id: number, updateFaceDto: UpdateFaceDto) {
    return `This action updates a #${id} face`;
  }

  remove(id: number) {
    return `This action removes a #${id} face`;
  }
}
