import { useContext, useState } from 'react'
import { Task, TaskManagementContext } from '../../TaskManagementProvider'
import { TaskApi } from '../../api/taskApi'
import { LoadingButton } from '@mui/lab'
import { SubmitHandler, useForm } from "react-hook-form"
import TaskInput from './form/TaskInput'

interface IFormInput {
    title: string;
    description: string;
    status?: string;
}

interface ITaskFormProps {
    status: string;
    setShowForm: (showForm: boolean) => void;
    defaultValues?: Partial<Task>
}

const TaskForm = ({ status, setShowForm, defaultValues = { title: "", description: "" } }: ITaskFormProps) => {
    const { createNewTask, updateTask } = useContext(TaskManagementContext)
    const { control, formState: { errors }, handleSubmit, reset } = useForm<IFormInput>({ defaultValues })
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
        try {
            setIsLoading(true)
            const newTask = {
                status,
                date: new Date(),
                ...data,
            }
            await saveTask(newTask, data?._id)
            reset()
            setShowForm(false)
        } catch (e) {
            console.error("Error while submiting form", e)
        } finally {
            setIsLoading(false)
        }
    }

    const saveTask = async (newTask: Task, taskId: string) => {
        if (taskId) {
            const task = await TaskApi.updateTask(taskId, newTask)
            return updateTask(task._id, task)
        }

        const task = await TaskApi.createTask(newTask)
        return createNewTask(task)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", padding: 16, gap: 16 }}>
            <TaskInput
                name="title"
                label="Title"
                control={control}
                errors={errors}
                errorMessage="Title is required"
            />

            <TaskInput
                name="description"
                label="Description"
                control={control}
                errors={errors}
                errorMessage="Description is required"
            />

            {defaultValues._id && (
                <TaskInput
                    name="status"
                    label="Status"
                    control={control}
                    errors={errors}
                    errorMessage="Status is required"
                    type="select"
                />
            )}

            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <LoadingButton loading={isLoading} type='button' onClick={() => setShowForm(false)}>Close</LoadingButton>
                <LoadingButton loading={isLoading} type='submit'>Submit</LoadingButton>
            </div>
        </form>
    )
}

export default TaskForm