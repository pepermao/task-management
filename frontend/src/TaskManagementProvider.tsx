import { createContext, useEffect, useState } from "react";
import { TaskApi } from "./api/taskApi";
import Loading from "./components/Loading";

export interface Task {
    _id: string;
    title: string;
    description: string;
    date: Date;
    status: string;
}

interface Provider {
    tasks: Task[];
    totalTasks: number;
    createNewTask: (task: Task) => void;
    removeTask: (removedTasksId: string) => void;
    updateTask: (taskId: string, updatedTask: Task) => void;
    setTotalTasks: (total: number) => void;
}

export const TaskManagementContext = createContext<Provider>({
    tasks: [],
    totalTasks: 0,
    setTotalTasks: () => { },
    createNewTask: () => { },
    removeTask: () => { },
    updateTask: () => { }
})

export const TaskManagementProvider = ({ status, children }: any) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { tasks, totalTasks } = await TaskApi.getTasks({ status })
                setTasks(tasks)
                setTotalTasks(totalTasks)
            } catch (e) {
                console.error("Error while fetching tasks")
            } finally {
                setIsLoading(false)
            }
        }

        fetchTasks();
    }, [])

    const createNewTask = (newTask: Task) => {
        setTasks((prev) => [...prev, newTask])
        setTotalTasks((total) => total + 1)
    }

    const removeTask = (removedTasksId: string) => {
        setTasks((prev) => prev.filter((task) => task?._id !== removedTasksId))
        setTotalTasks((total) => total - 1)
    }

    const updateTask = (taskId: string, updatedTask: Task) => {
        setTasks((prev) => prev.map((task) => task._id === taskId ? updatedTask : task))
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <TaskManagementContext.Provider value={{
            tasks,
            totalTasks,
            setTotalTasks,
            createNewTask,
            removeTask,
            updateTask
        }}>
            {children}
        </TaskManagementContext.Provider>
    )
}
