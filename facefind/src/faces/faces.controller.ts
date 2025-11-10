import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacesService } from './faces.service';
import { CreateFaceDto } from './dto/create-face.dto';
import { UpdateFaceDto } from './dto/update-face.dto';

@Controller('faces')
export class FacesController {
  constructor(private readonly facesService: FacesService) {}

  @Post()
  create(@Body() createFaceDto: CreateFaceDto) {
    return this.facesService.create(createFaceDto);
  }

  @Get()
  findAll() {
    return this.facesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaceDto: UpdateFaceDto) {
    return this.facesService.update(+id, updateFaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facesService.remove(+id);
  }
}
