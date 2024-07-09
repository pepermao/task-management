import { Card, CardContent, Typography } from '@mui/material'
import { useState } from 'react'
import { Task } from '../../TaskManagementProvider'
import TaskForm from './TaskForm';
import TaskCardHeader from './TaskCardHeader';

interface TaskManagementProps {
    task: Task;
}

const TaskManagementCard = ({ task }: TaskManagementProps) => {
    const [showForm, setShowForm] = useState(false)
    const date = new Date(task.date)

    return (
        <Card variant='outlined'>
            {!showForm ? (
                <CardContent>
                    <TaskCardHeader task={task} setShowForm={setShowForm} />
                    <Typography variant="body2">
                        {task.description}
                    </Typography>

                    <Typography variant="body2" style={{ marginTop: 8, textAlign: "end" }}>
                        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                    </Typography>
                </CardContent>
            ) : (
                <TaskForm status={task.status} setShowForm={setShowForm} defaultValues={task} />
            )}
        </Card>
    )
}

export default TaskManagementCard