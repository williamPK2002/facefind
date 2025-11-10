import { Body, Controller, Delete, Get, Param, ParseIntPipe, ValidationPipe, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    getAllTasks(@Query("role") role? : "SoftwareEngineer" | "SchoolOfLaw" | "HumanResources" | "SchoolOfScience") {
        return this.tasksService.getAllTasks(role);
    }
    // Example of query parameter: /tasks?role=SoftwareEngineer
    // If you want to filter tasks by role, you can use a query parameter like above

    // @Get('/SoftwareEngineer')
    // getTaskByRole() {
    //     return 'This action returns tasks by role of Software Engineer';
    // }

    // @Get('/completed')
    // getCompletedTasks() {
    //     return 'This action returns all completed tasks';
    // }
    //Make sure to put more specific routes before less specific ones

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.getTaskById(id);
        //The + sign converts string to number, if id is a number then the number will be plus 1 id
    }

    @Post()
    createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto) {
        return this.tasksService.createTask(createTaskDto);
    }
    //the createTaskDto is an object that contains title, Report and role
    //we replaced the inline type definition with CreateTaskDto
    //earlier it was: createTask(@Body() task: { title: string; Report: string; role: string })

    @Patch('/:id')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateTaskDto: UpdateTaskDto) {
        return this.tasksService.updateTask(id, updateTaskDto);
    }
    //the updateTaskDto is an object that may contain title, Report and/or role
    //we replaced the inline type definition with UpdateTaskDto
    //earlier it was: updateTask(@Param('id', ParseIntPipe) id: number, @Body() task: { title?: string; Report?: string; role?: string })



    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.deleteTask(id);
    }
}
