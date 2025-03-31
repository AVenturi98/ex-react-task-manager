import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

import TaskRow from "../components/TaskRow";

export default function TaskList() {

    const { task } = useContext(GlobalContext);



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
                    {task.map(e => (
                        <TaskRow key={e.id} item={e} />
                    ))}
                </tbody>

            </table>
        </>
    )
}