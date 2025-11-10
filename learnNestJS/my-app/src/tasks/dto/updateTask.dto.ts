import {CreateTaskDto} from './create-task.dto';
import { PartialType } from '@nestjs/mapped-types';
//you may need to install @nestjs/mapped-types package
//npm install @nestjs/mapped-types

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
// PartialType makes all properties optional in the UpdateTaskDto