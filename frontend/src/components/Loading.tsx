import { CircularProgress } from '@mui/material'

const Loading = () => {
    return (
        <div style={{ width: "100%", height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
        </div>
    )
}

export default Loading