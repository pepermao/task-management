import { Input, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller } from 'react-hook-form'

interface ITaskInputProps {
    control: any;
    errors: any;
    name: string;
    label: string;
    errorMessage: string;
    type?: string;
}

const TaskInput = ({ control, errors, name, label, errorMessage, type = "text" }: ITaskInputProps) => {

    switch (type) {
        case "text":
            return (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label htmlFor={name}>{label}</label>
                    <Controller
                        name={name}
                        render={({ field }) => <Input id={name} {...field} />}
                        control={control}
                        rules={{ required: true }}
                    />
                    {errors.description?.type === 'required' && <p style={{ color: "red", fontSize: 14 }} role="alert">{errorMessage}</p>}
                </div>
            )
        case "select":
            return (
                <div>
                    <InputLabel id={name}>{label}</InputLabel>
                    <Controller
                        name={name}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select labelId={name} {...field}>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="In progress">In progress</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                            </Select>
                        )}
                    />
                </div>
            )
        default:
            <></>
    }
}

export default TaskInput