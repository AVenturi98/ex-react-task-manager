import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    const URL_API = 'http://localhost:3001';

    const [task, setTask] = useState([]);

    async function fetchTasks() {
        try {
            await axios.get(`${URL_API}/tasks`)
                .then(res => {
                    setTask(res.data)
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

    console.log('task', task)


    return (
        <GlobalContext.Provider value={{ URL_API, task }}>
            {children}
        </GlobalContext.Provider>

    )
}

export default GlobalContext