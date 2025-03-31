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

            setTasks((prev) => prev.filter((task) => task.id !== id));
        } catch (err) {
            console.error("Failed to remove task:", err);
        }
    }

    // Modifica Task
    function updateTask() {
        // Implementazione futura
    }

    return { tasks, addTask, removeTask, updateTask };
}

export default useTask