import { useState } from "react";
import { ITask } from "../interface/ITask";

const initialTasks: ITask[] = [
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: false },
    { id: 3, text: "Task 3", completed: false },
    { id: 4, text: "Task 4", completed: false },
];

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<ITask[]>(initialTasks);
    const [newTaskText, setNewTaskText] = useState<string>('');

    const handleTaskCompletion = (taskId: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleRemoveCompleted = () => setTasks(tasks.filter(task => !task.completed));

    const handleAddTask = () => {
        if (newTaskText.trim() !== '') {
            const newTask: ITask = {
                id: tasks.length + 1,
                text: newTaskText,
                completed: false,
            };

            setTasks([...tasks, newTask]);
            setNewTaskText('');
        }
    }

    return (
        <>
            <div>
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                />
                <button onClick={handleAddTask}>Adicionar Tarefa</button>
            </div>
            <button
                onClick={() => handleRemoveCompleted()}
            >
                Remover concluidos
            </button>
            <ul>
                {tasks?.map(task => (
                    <li key={task.id}>
                        {task.text}
                        <button onClick={() => handleTaskCompletion(task.id)}>
                            {task.completed ? 'Reabrir' : 'Concluído'}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TaskList;