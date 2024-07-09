import { useContext, useState } from 'react'
import { TaskManagementContext } from '../../TaskManagementProvider';
import TaskManagementCard from '../Task/TaskCard';
import { Button, Card, Typography } from '@mui/material';
import TaskForm from '../Task/TaskForm';
import { statusColors } from '../../statusColors';
import KanbanColumnStyled from './KanbanColumn.style';

const KanbanColumn = ({ status }: any) => {
    const { tasks, totalTasks } = useContext(TaskManagementContext)
    const [showForm, setShowForm] = useState(false);

    const handleAddTaskClick = () => {
        setShowForm((prev) => !prev)
    }

    return (
        <KanbanColumnStyled statuscolor={statusColors[status]}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography className="kanban-column-title">
                    {status}
                </Typography>

                <Typography>
                    {totalTasks} in total
                </Typography>
            </div>


            <Button onClick={handleAddTaskClick} className="add-task-button">+ Add new Task</Button>

            {showForm && (
                <Card>
                    <TaskForm status={status} setShowForm={setShowForm} />
                </Card>
            )}

            {tasks && tasks?.filter((task) => task.status === status).map((task) => (
                <TaskManagementCard key={task._id} task={task} />
            ))}
        </KanbanColumnStyled>
    )
}

export default KanbanColumn