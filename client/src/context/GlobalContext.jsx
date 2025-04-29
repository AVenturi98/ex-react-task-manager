import { createContext } from "react";
import { useTask } from "../hooks/useTask";
import dayjs from "dayjs";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {


    const taskData = useTask();


    // Date dayjs
    const dateFormat = dayjs(taskData.createdAt).format('DD-MM-YYYY');

    return (
        <GlobalContext.Provider value={{ ...taskData, dateFormat }}>
            {children}
        </GlobalContext.Provider>

    )
}

export default GlobalContext