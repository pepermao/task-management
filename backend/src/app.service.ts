import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/Task.schema';
import { Model } from 'mongoose';
import { GetTasksDTO } from './dto/get-tasks.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class AppService {
    constructor(
        @InjectModel(Task.name)
        private TaskModel: Model<TaskDocument>
    ) { }

    listAll({ status, page, pageSize, order }: GetTasksDTO) {
        return this.TaskModel.find({ status })
            .limit(pageSize)
            .skip(page * pageSize)
            .sort(order)
    }

    findById(taskId) {
        return this.TaskModel.findOne({ _id: taskId })
    }

    async create(task: CreateTaskDTO) {
        return await new this.TaskModel(task).save()
    }

    delete(taskId) {
        return this.TaskModel.deleteOne({ _id: taskId })
    }

    async update(taskId: string, updatedTask: UpdateTaskDTO) {
        const task = await this.findById(taskId)
        const newTask = Object.assign(task, updatedTask)

        await this.TaskModel.updateOne({ _id: task._id }, newTask)

        return newTask
    }

    count(query) {
        return this.TaskModel.countDocuments(query)
    }
}
