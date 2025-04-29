import { useContext, useState, useMemo } from "react";
import GlobalContext from "../context/GlobalContext";

import TaskRow from "../components/TaskRow";

export default function TaskList() {

    const { tasks } = useContext(GlobalContext);

    // State for order
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(prev => -prev)
        } else {
            setSortBy(column);
            setSortOrder(1)
        }
    }

    const sortIcon = sortOrder === 1 ? '↑' : '↓';

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {

            let comparison;

            if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title);

            } else if (sortBy === 'status') {
                const statusOrder = ['To do', 'Doing', 'Done'];
                comparison = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);

            } else if (sortBy === 'createdAt') {
                comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }

            return comparison * sortOrder;
        })

    }, [sortBy, sortOrder, tasks])



    return (
        <>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}>
                            Nome {sortBy === 'title' && sortIcon}
                        </th>
                        <th onClick={() => handleSort('status')}>
                            Stato {sortBy === 'status' && sortIcon}
                        </th>
                        <th onClick={() => handleSort('createdAt')}>
                            Data creazione {sortBy === 'createdAt' && sortIcon}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map(e => (
                        <TaskRow key={e.id} item={e} />
                    ))}
                </tbody>

            </table>
        </>
    )
}