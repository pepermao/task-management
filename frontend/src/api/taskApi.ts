import axios from 'axios';
import { Task } from '../TaskManagementProvider';

const request = axios.create({
    baseURL: "http://localhost:8000/api/task",
    withCredentials: true,
});

interface fetchOptions {
    page?: number;
    pageSize?: number;
    order?: string;
    status?: string;
}

const getTasks = (options: fetchOptions = {}): any => {
    const params = {
        page: options.page ? options.page - 1 : 0,
        pageSize: options.pageSize ? options.pageSize : 10,
        order: options.order || "asc",
        status: options.status,
    }

    return request
        .get("/", { params })
        .then((response) => {
            const { tasks, totalPages, totalTasks } = response.data;

            return {
                tasks,
                totalPages,
                totalTasks,
            }
        })
        .catch(() => {
            console.error("Error while fetching tasks")
        });
}

const createTask = (task: Partial<Task>) => {
    return request
        .post("/", task)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            console.error("Error while creating task")
        });
}

const removeTask = (taskId: string) => {
    return request
        .delete(`/${taskId}`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            console.error("Error while removing task")
        });
}

const updateTask = (taskId: string, task: Partial<Task>) => {
    return request
        .put(`/${taskId}`, task)
        .then((response) => {
            return response.data
        })
        .catch(() => {
            console.error("Error while updating task")
        })
}

export const TaskApi = {
    getTasks,
    createTask,
    removeTask,
    updateTask
}