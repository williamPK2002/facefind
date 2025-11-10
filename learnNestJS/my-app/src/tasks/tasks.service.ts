import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
    // Business logic and data management would go here
    private tasks = [{
        id: 1, 
        title: 'Sample Task', 
        publisherEmail: 'sample@example.com',
        Report: 'Just having fun learning NestJS', 
        role: 'SoftwareEngineer'
    },{
        id: 2, 
        title: 'Another Task', 
        publisherEmail: 'dork@example.com',
        Report: 'Learning by watching SUITS!', 
        role: 'SchoolOfLaw'
    },{
        id: 3, 
        title: 'Third Task', 
        publisherEmail: 'snazzy@example.com',
        Report: 'Learning by watching The Office!', 
        role: 'HumanResources'
    },{
        id: 4, 
        title: 'Fourth Task', 
        publisherEmail: 'grumpy@example.com',
        Report: 'Learning by watching Cosmos!', 
        role: 'SchoolOfScience'
    },{
        id: 5, 
        title: 'Fifth Task', 
        publisherEmail: 'washingtonDC@example.com',
        Report: 'Learning by watching Friends!', 
        role: 'HumanResources'
    },{
        id: 6, 
        title: 'Sixth Task', 
        publisherEmail: 'DirtyDeedsDoneDirtCheap@example.com',
        Report: 'Learning by watching The Big Bang Theory!', 
        role: 'SchoolOfScience'
    }];

    getAllTasks(role?: "SoftwareEngineer" | "SchoolOfLaw" | "HumanResources" | "SchoolOfScience") {
        if (role){
            const tasks = this.tasks.filter(task => task.role === role);
            if (tasks.length === 0) {//if no tasks found for the given role
                throw new NotFoundException(`No tasks found for role ${role}`);
            }
            return tasks;
        }
        return this.tasks;
    }

    getTaskById(id: number) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {//check if the task with ID exists
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    createTask(createTaskDto: CreateTaskDto) {
        const HighestId = [...this.tasks].sort((a, b) => b.id - a.id)[0].id;
        const newTask = { id: HighestId + 1, ...createTaskDto };
        this.tasks.push(newTask);
        return newTask;
    }

    updateTask(id: number, updateTaskDto: UpdateTaskDto) {
        this.tasks = this.tasks.map(t => {//in maps we return something, it is called a callback function
            if (t.id === id) {
                return { ...t, ...updateTaskDto };
            }
            return t;
        })//map returns a new array
        return this.getTaskById(id);
    }//end of updateTask

    deleteTask(id: number) {
        const taskToDelete = this.getTaskById(id);
        this.tasks = this.tasks.filter(t => t.id !== id);
        return taskToDelete;
    }
}
