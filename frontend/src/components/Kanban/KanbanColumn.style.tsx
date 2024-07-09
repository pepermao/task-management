import styled from "styled-components";


const KanbanColumnStyled = styled.div`
    width: 100%;
    min-height: 80vh;
    gap: 16px;
    display: flex;
    flex-direction: column;

    .kanban-column-title::before {
        content: " ";
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 10px;
        background: ${({ statuscolor }: any) => statuscolor};
        position: relative;
        margin-right: 5px;
    }

    .add-task-button {
        background: white;
    }
`

export default KanbanColumnStyled