import { useState, useEffect } from "react";
import axios from "axios";

export function useTask() {
    const URL_API = 'http://localhost:3001';

    const [tasks, setTasks] = useState([]);

    async function fetchTasks() {
        try {
            await axios.get(`${URL_API}/tasks`)
                .then(res => {
                    setTasks(res.data)
                    // console.log(res.data)
                })
                .catch(err => console.error(err))
        } catch {
            err => console.error(err)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    function addTask() {

    }

    function removeTask() {

    }

    function updateTask() {

    }

    return { tasks, addTask, removeTask, updateTask }
}

export default useTask