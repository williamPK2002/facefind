import { Injectable } from '@nestjs/common';
import {Prisma} from '../../generated/prisma';
//you gotta import the Prisma from the generated folder, not the package itself like in the video tutorial.
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TaskService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: Prisma.taskCreateInput) {
    return this.databaseService.task.create({ data: createTaskDto });
  }

  async findAll(role?: "SoftwareEngineer" | "SchoolOfLaw" | "HumanResources" | "SchoolOfScience") {
    if (role) {
      return this.databaseService.task.findMany({ where: { role } });
    }
    return this.databaseService.task.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.task.findUnique({ where: { 
      id,
      //if the key and value are the same, you can just write it once like this
      // if they were different, you'd have to do {id: identifier}
    } });
  }

  async update(id: number, updateTaskDto: Prisma.taskUpdateInput) {
    return this.databaseService.task.update({ where: {
       id 
      }, data: updateTaskDto });
  }

  async remove(id: number) {
    return this.databaseService.task.delete({ where: { id } });
  }
}

