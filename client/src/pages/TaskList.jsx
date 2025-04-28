import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

import TaskRow from "../components/TaskRow";

export default function TaskList() {

    const { tasks } = useContext(GlobalContext);
    const [value, setValue] = useState('');

    const filtered = tasks.filter(t => t.title.toLowerCase().includes(value.toLocaleLowerCase()));

    return (
        <>
            <input
                type="text"
                onChange={e => setValue(e.target.value)}
                value={value} />

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Created Data</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(e => (
                        <TaskRow key={e.id} item={e} />
                    ))}
                </tbody>

            </table>
        </>
    )
}