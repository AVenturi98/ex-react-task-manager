import { useState, useEffect } from "react";

export function useTask() {
    const URL_API = 'http://localhost:3001';

    const [tasks, setTasks] = useState([]);

    async function fetchTasks() {
        try {
            const response = await fetch(`${URL_API}/tasks`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            console.error("Failed to fetch tasks:", err);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    // Aggingi Task
    async function addTask(newTask) {
        try {
            const response = await fetch(`${URL_API}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { success, message, task } = await response.json();

            if (!success) {
                throw new Error(message);
            }

            // Aggiungi il nuovo task alla lista senza ricaricare la pagina
            setTasks((prev) => [...prev, task]);
        } catch (err) {
            console.error("Failed to add task:", err);
        }
    }

    // Rimuovi Task
    async function removeTask(id) {
        try {
            const response = await fetch(`${URL_API}/tasks/${id}`, {
                method: "DELETE",
            })

            const { success, message } = await response.json();
            if (!success) {
                throw new Error(`Error! message: ${message}`);
            }

            setTasks((prev) => prev.filter((task) => task.id !== id)); // Rimuovi il task dalla lista senza ricaricare la pagina
        } catch (err) {
            console.error("Failed to remove task:", err);
        }
    }

    // Modifica Task
    async function updateTask(updatedTask) {
        try {
            const response = await fetch(`${URL_API}/tasks/${updatedTask.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask)
            });

            const { success, message, task: newTask } = await response.json();
            if (!success) {
                throw new Error(`Error! message: ${message}`);
            };

            setTasks(prev => prev.map(
                oldTask => oldTask.id === newTask.id ? newTask : oldTask
            ))

        } catch (err) {
            console.error(`ERROR: ${err}`)
        }

    }


    // Rimuovi tasks multipli
    async function removeMultipleTasks(taskIds) {
        const deleteRequests = taskIds.map(async id => {
            await fetch(`${URL_API}/tasks/${id}`, { method: 'DELETE' })
                .then(res => res.json())

        })

        const result = await Promise.allSettled(deleteRequests); // Wait for all delete requests to settle
        //result is an array of objects with status and value properties

        const successfulDeletes = []; //array for successful deletes
        const failedDeletes = []; //array for failed deletes

        // Loop through the results and separate successful and failed deletes
        result.forEach((res, index) => {
            if (res.status === 'fulfilled') {
                successfulDeletes.push(taskIds[index]); // Add the task ID to the successful deletes array
            } else {
                failedDeletes.push(taskIds[index]); // Add the task ID to the failed deletes array
            }
        });

        if (successfulDeletes.length > 0) {
            setTasks(prev => prev.filter(task => !successfulDeletes.includes(task.id))); // Update the state to remove the successfully deleted tasks
        }
        if (failedDeletes.length > 0) {
            throw new Error(`Failed to delete tasks with IDs: ${failedDeletes.join(', ')}`); // Throw an error with the failed task IDs
        }
    }


    return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
}

export default useTask