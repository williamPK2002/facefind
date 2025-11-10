import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { TaskService } from './task.service';
import { Prisma, Role } from '../../generated/prisma';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { skip } from 'node:test';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle({ default: false }) //this disables rate limiting for all routes in this controller
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  private readonly logger = new MyLoggerService(TaskController.name); // Initialize custom logger with context

  //example: http://localhost:3000/task

  @Post()
  create(@Ip() ip: string, @Body() createTaskDto: Prisma.taskCreateInput) {
    this.logger.log("Ip : " + ip + " Creating task", TaskController.name);
    return this.taskService.create(createTaskDto);
  }

  //to get with Role filter
  //example: http://localhost:3000/task?role=SoftwareEngineer
  @SkipThrottle({ default: false }) //this disables rate limiting for this specific route
  @Get()
  findAll(@Ip() ip: string, @Query("role") role?: "SoftwareEngineer" | "SchoolOfLaw" | "HumanResources" | "SchoolOfScience"){
    this.logger.log("Ip : " + ip + " findAll called with role: " + role, TaskController.name);
    return this.taskService.findAll(role);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } }) //this enables rate limiting for this specific route
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: Prisma.taskUpdateInput) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
