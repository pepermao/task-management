import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/Task.schema';

const TaskModel = MongooseModule.forFeature([
    {
        name: Task.name,
        schema: TaskSchema,
    }
])

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/TaskManagement'), TaskModel],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
