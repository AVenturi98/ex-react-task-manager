import { createContext } from "react";
import { useTask } from "../hooks/useTask";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {


    const taskData = useTask();


    return (
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>

    )
}

export default GlobalContext