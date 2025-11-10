# NestJS REST API Development Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Project Setup](#project-setup)
4. [Core Concepts](#core-concepts)
5. [Validation with Class-Validator](#validation-with-class-validator)
6. [Database Integration with Prisma](#database-integration-with-prisma)
7. [Creating REST API Resources](#creating-rest-api-resources)
8. [Testing and Deployment](#testing-and-deployment)

## Introduction

NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. Created by Kamil Myśliwiec in 2017, NestJS brings Angular's architectural patterns to the backend, providing a robust foundation for enterprise-grade applications.

### Key Features
- **Modularity**: Organized code structure with modules
- **Dependency Injection**: Built-in IoC container
- **Decorators and Metadata**: TypeScript decorators for clean, declarative code
- **TypeScript First**: Built with TypeScript support out of the box

## Prerequisites

Before starting, ensure you have:
- Node.js (v16 or higher)
- npm or yarn package manager
- Basic TypeScript knowledge
- Understanding of REST API principles

## Project Setup

### 1. Install NestJS CLI
```bash
npm install -g @nestjs/cli
```

### 2. Create a New Project
```bash
# Create a new project
nest new my-app

# Navigate to project directory
cd my-app

# Start development server
npm run start:dev
```

### 3. Generate Resources
```bash
# Generate module, controller, and service for "tasks"
nest g module tasks
nest g controller tasks
nest g service tasks

# Or generate all at once
nest g resource tasks
```

## Core Concepts

### Dependency Injection Providers

#### useClass Provider
The `useClass` syntax allows dynamic class resolution for tokens:
```typescript
{
  provide: 'DatabaseService',
  useClass: process.env.NODE_ENV === 'development' ? DevDatabaseService : ProdDatabaseService
}
```

#### useFactory Provider
The `useFactory` syntax enables dynamic provider creation:
```typescript
{
  provide: 'CONFIG',
  useFactory: (configService: ConfigService) => configService.get('database'),
  inject: [ConfigService]
}
```

### Route Definition

#### Controller Decorators
- `@Controller(path?)`: Sets URL prefix for all routes in the class
- `@Get()`, `@Post()`, `@Put()`, `@Delete()`: Define HTTP method handlers

#### Parameter Decorators
- `@Param()`: Extract route parameters
- `@Query()`: Extract query parameters
- `@Body()`: Extract request body
- `@Headers()`: Extract request headers
- `@Req()`: Access full request object
- `@Res()`: Access response object

## Validation with Class-Validator

### Installation
```bash
npm install class-transformer class-validator
npm install @nestjs/mapped-types
```

### Validation Decorators

#### String Validation
| Decorator | Description |
|-----------|-------------|
| `@IsString()` | Validates if value is a string |
| `@IsNotEmpty()` | Validates if value is not empty |
| `@MinLength(min)` | Minimum length validation |
| `@MaxLength(max)` | Maximum length validation |
| `@Length(min, max)` | String length between min and max |
| `@Contains(seed)` | Checks if string contains the seed |
| `@IsAlpha()` | Checks if string contains only letters |
| `@IsAlphanumeric()` | Checks if string contains only letters and numbers |

#### Number Validation
| Decorator | Description |
|-----------|-------------|
| `@IsNumber()` | Validates if value is a number |
| `@IsInt()` | Validates if value is an integer |
| `@Min(min)` | Minimum value |
| `@Max(max)` | Maximum value |
| `@IsPositive()` | Checks if number is positive |
| `@IsNegative()` | Checks if number is negative |

#### Type Validation
| Decorator | Description |
|-----------|-------------|
| `@IsBoolean()` | Validates if value is a boolean |
| `@IsDate()` | Validates if value is a date |
| `@IsArray()` | Validates if value is an array |
| `@IsObject()` | Validates if value is an object |
| `@IsEnum(entity)` | Validates against enum values |

#### Format Validation
| Decorator | Description |
|-----------|-------------|
| `@IsEmail()` | Email validation |
| `@IsUrl()` | URL validation |
| `@IsUUID()` | UUID validation |
| `@IsIP()` | IP address validation |
| `@IsMobilePhone()` | Mobile phone validation |

#### Optional & Conditional
| Decorator | Description |
|-----------|-------------|
| `@IsOptional()` | Makes field optional |
| `@ValidateIf(condition)` | Conditional validation |

#### Array Validation
| Decorator | Description |
|-----------|-------------|
| `@ArrayMinSize(min)` | Minimum array size |
| `@ArrayMaxSize(max)` | Maximum array size |
| `@ArrayNotEmpty()` | Array is not empty |

### DTO Example
```typescript
import { IsString, IsEnum, IsNotEmpty, IsOptional, MinLength, MaxLength } from 'class-validator';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus = TaskStatus.PENDING;
}
```

## Database Integration with Prisma

### Installation and Setup

#### 1. Install Prisma
```bash
npm install prisma -D
```

#### 2. Initialize Prisma
```bash
npx prisma init
```
This creates:
- `prisma/schema.prisma` - Database schema definition
- `.env` - Environment variables including DATABASE_URL

#### 3. Configure Database Connection
In your `.env` file, add your database URL:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
# For NeonDB (free PostgreSQL service):
DATABASE_URL="postgresql://username:password@ep-xyz.us-east-1.aws.neon.tech/dbname"
```

#### 4. Define Data Model
In `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  status      TaskStatus @default(PENDING)
  role        Role?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
}

enum Role {
  SoftwareEngineer
  SchoolOfLaw
  HumanResources
  SchoolOfScience
}
```

#### 5. Create and Apply Migrations
```bash
# Create migration
npx prisma migrate dev --name init

# After schema changes
npx prisma generate
npx prisma migrate dev --name add_new_field
```

### Database Service Implementation

#### 1. Generate Database Module and Service
```bash
nest g module database
nest g service database
```

#### 2. Database Service
```typescript
// src/database/database.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

#### 3. Database Module
```typescript
// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
```

## Creating REST API Resources

### 1. Generate Resource
```bash
nest g resource task
```
Select "REST API" when prompted and choose "No" for generating CRUD entry points (we'll use Prisma types).

### 2. Task Module
```typescript
// src/task/task.module.ts
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
```

### 3. Task Controller
```typescript
// src/task/task.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  ParseIntPipe 
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Prisma } from '../../generated/prisma';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: Prisma.TaskCreateInput) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Query('role') role?: 'SoftwareEngineer' | 'SchoolOfLaw' | 'HumanResources' | 'SchoolOfScience') {
    return this.taskService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateTaskDto: Prisma.TaskUpdateInput
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }
}
```

### 4. Task Service
```typescript
// src/task/task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '../../generated/prisma';

@Injectable()
export class TaskService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: Prisma.TaskCreateInput) {
    return this.databaseService.task.create({ 
      data: createTaskDto 
    });
  }

  async findAll(role?: 'SoftwareEngineer' | 'SchoolOfLaw' | 'HumanResources' | 'SchoolOfScience') {
    const whereClause = role ? { role } : {};
    return this.databaseService.task.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: number) {
    const task = await this.databaseService.task.findUnique({ 
      where: { id } 
    });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    
    return task;
  }

  async update(id: number, updateTaskDto: Prisma.TaskUpdateInput) {
    // Check if task exists
    await this.findOne(id);
    
    return this.databaseService.task.update({ 
      where: { id }, 
      data: updateTaskDto 
    });
  }

  async remove(id: number) {
    // Check if task exists
    await this.findOne(id);
    
    return this.databaseService.task.delete({ 
      where: { id } 
    });
  }
}
```

## Testing and Deployment

### Start Development Server
```bash
npm run start:dev
```

### API Endpoints
Once running, your API will be available at `http://localhost:3000` with the following endpoints:

- `GET /tasks` - Get all tasks (optional query param: `?role=SoftwareEngineer`)
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task by ID
- `DELETE /tasks/:id` - Delete task by ID

### Example API Requests

#### Create Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete REST API",
    "description": "Build a complete REST API with NestJS and Prisma",
    "status": "IN_PROGRESS",
    "role": "SoftwareEngineer"
  }'
```

#### Get All Tasks
```bash
curl http://localhost:3000/tasks
```

#### Get Tasks by Role
```bash
curl http://localhost:3000/tasks?role=SoftwareEngineer
```

### Best Practices

1. **Error Handling**: Always handle errors gracefully with appropriate HTTP status codes
2. **Validation**: Use DTOs with class-validator for input validation
3. **Documentation**: Consider adding Swagger/OpenAPI documentation
4. **Testing**: Write unit and integration tests
5. **Environment Variables**: Use configuration management for different environments
6. **Logging**: Implement proper logging for debugging and monitoring

### Next Steps

- Add authentication and authorization
- Implement pagination for large datasets
- Add API documentation with Swagger
- Set up testing (unit and e2e tests)
- Configure environment-specific settings
- Add logging and monitoring
- Implement caching strategies
- Set up CI/CD pipeline

---

*This guide provides a comprehensive foundation for building REST APIs with NestJS and Prisma. Follow the patterns and best practices outlined here to create robust, scalable applications.*

# Essential additions

in the main you can add in

app.setGlobalPrefix('api')

so when a request is called

/api/task/1

CORS = cross origin resource sharing

npm i @nest.js/throttler

app.module:
import throttlerModule and throttlerGuard
import APP_GUARD

add them into the import: 
ThrottlerModule,.forRoot([{
  name: 'Long',
  ttl: 60000 // time to live. 1 minute
  limit:3 ,
  },{
    ....
  }])


  task.controller
  SkipThrottler
  throttle({short: {ttl:1000, limit: 1}})

# Logger

nest g module my-logger
nest g service my-logger

logger.service:
import consoleLogger
extend ConsoleLogger onto the class
log: message + context
error: message + stackOrContext 
<To be Continue>
log to file is to pen down the event that ha occured like if some were to request an API then the log will write down the event of what is ordered along with the IP of the user. 
(what a f%^ck*&^g hassle, feel like I wanna @$@$#% someone, and $#^%$#^%$#^ some)

logger.module:
export the logger.service

main.ts:// if you want to provide it globally
import myLoggerService
const app = await NestFactory.create(AppModule, {....})
app.useLogger(app.get(myLoggerService)) // now the logger will be provided globally

controller:
import MyLoggerService
private readonly logger = new MyLoggerService(TaskController.name)//in the body
import Ip
you can use IP to see who it was from

Exception filters.
../src/all-exceptions.filter