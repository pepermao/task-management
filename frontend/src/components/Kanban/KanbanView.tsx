import { Box, Typography } from '@mui/material';
import { StatusEnum } from '../../enum';
import KanbanColumn from './KanbanColumn';
import KanbanViewStyled from './KanbanView.style';
import { TaskManagementProvider } from '../../TaskManagementProvider';

const KanbanView = () => {
    return (
        <KanbanViewStyled>
            <Typography className='kanban-title' variant='h4'>
                Task management
            </Typography>

            <Box className='container'>
                {Object.keys(StatusEnum).map((status) => (
                    <TaskManagementProvider key={status} status={status}>
                        <KanbanColumn status={status} />
                    </TaskManagementProvider>
                ))}
            </Box>
        </KanbanViewStyled>
    )
}

export default KanbanView