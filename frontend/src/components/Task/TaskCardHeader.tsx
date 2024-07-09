import { Button, Popover, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UpdateIcon from '@mui/icons-material/Update';
import { useContext, useState } from 'react';
import { Task, TaskManagementContext } from '../../TaskManagementProvider';
import { TaskApi } from '../../api/taskApi';
import TaskCardHeaderStyled from './TaskCardHeader.style';
import { LoadingButton } from '@mui/lab';

interface TaskCardHeaderProps {
    task: Task;
    setShowForm: (showForm: boolean) => void;
}

const TaskCardHeader = ({ task, setShowForm }: TaskCardHeaderProps) => {
    const { removeTask } = useContext(TaskManagementContext)
    const [isLoading, setIsLoading] = useState(false)

    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickRemove = async () => {
        try {
            setIsLoading(true)
            await TaskApi.removeTask(task._id)
            removeTask(task._id)
        } catch (error) {
            console.error("Error while deleting task")
        } finally {
            setIsLoading(false)
        }
    }

    const handleClickUpdate = () => {
        setShowForm(true)
        handleClose()
    }

    return (
        <TaskCardHeaderStyled>
            <Typography className='card-title' variant="h6" component="div">
                {task.title}
            </Typography>
            <Button aria-describedby={id} style={{ color: "black", padding: 0 }} onClick={handlePopoverClick}>
                <MoreVertIcon />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                sx={{ display: "flex", flexDirection: "column" }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <LoadingButton loading={isLoading} onClick={handleClickRemove} style={{ color: "black", width: "100%", display: "flex", gap: 6, padding: 8 }}>
                    <DeleteIcon /> Delete
                </LoadingButton>

                <LoadingButton loading={isLoading} onClick={handleClickUpdate} style={{ color: "black", width: "100%", display: "flex", gap: 6, padding: 8 }}>
                    <UpdateIcon /> Update
                </LoadingButton>
            </Popover>
        </TaskCardHeaderStyled>
    )
}

export default TaskCardHeader