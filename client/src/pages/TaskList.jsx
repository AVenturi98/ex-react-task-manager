import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

import TaskRow from "../components/TaskRow";

export default function TaskList() {

    const { tasks } = useContext(GlobalContext);

    console.log(tasks)



    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Created Data</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(e => (
                        <TaskRow key={e.id} item={e} />
                    ))}
                </tbody>

            </table>
        </>
    )
}