import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetTasksDTO } from './dto/get-tasks.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller()
export class AppController {
    private readonly logger = new Logger("ClaimController");
    constructor(private readonly appService: AppService) { }

    @Get("/api/task")
    getTasks(@Query() getTasksDto: GetTasksDTO) {
        const { page, pageSize } = getTasksDto
        return Promise.all([
            this.appService.listAll(getTasksDto),
            this.appService.count({ status: getTasksDto.status }),
        ])
            .then(([tasks, totalTasks]) => {
                const totalPages = Math.ceil(totalTasks / pageSize)

                this.logger.log(`Found ${totalTasks} tasks. Page ${page} of ${totalPages}`)
                return {
                    tasks,
                    totalTasks,
                    totalPages,
                    page,
                    pageSize
                }
            })
    }

    @Get("/api/task/:taskId")
    getById(@Param("taskId") taskId: string) {
        return this.appService.findById(taskId);
    }

    @Post("/api/task")
    createTask(@Body() createTaskDTO: CreateTaskDTO) {
        return this.appService.create(createTaskDTO)
    }

    @Delete("/api/task/:taskId")
    deleteTask(@Param("taskId") taskId: string) {
        return this.appService.delete(taskId)
    }

    @Put("/api/task/:taskId")
    updateTask(@Param("taskId") taskId: string, @Body() updateTaskDTO: UpdateTaskDTO) {
        return this.appService.update(taskId, updateTaskDTO)
    }
}
