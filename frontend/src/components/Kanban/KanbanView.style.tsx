import styled from "styled-components";

const KanbanViewStyled = styled.div`
    margin: 0;
    min-height: 90vh;
    background: #eee;
    padding: 64px;

    .kanban-title {
        font-size: 32px;
        margin-bottom: 16px;
    }

    .container {
        display: flex;
        justify-content: space-between;
        gap: 32px;
    }
`

export default KanbanViewStyled