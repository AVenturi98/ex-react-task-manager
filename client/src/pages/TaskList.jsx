import { useContext, useState, useMemo, useRef, useCallback } from "react";
import GlobalContext from "../context/GlobalContext";
// Components
import TaskRow from "../components/TaskRow";

const debounce = (callback, delay) => {
    let timer;
    return (value) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}

export default function TaskList() {

    const { tasks } = useContext(GlobalContext);

    const searchRef = useRef();

    // Search value
    const [searchQuery, setSearchQuery] = useState('');

    // Debounce the search input
    const debouncedSearch = useCallback(debounce(setSearchQuery, 500), []);

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
        return [...tasks]
            .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {

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

    }, [sortBy, sortOrder, tasks, searchQuery])




    return (
        <>
            <div className="searchInput">
                <h2>Tasks</h2>
                <input
                    type="text"
                    placeholder="Cerca task..."
                    onChange={e => debouncedSearch(e.target.value)}
                    ref={searchRef}
                    style={{ margin: "20px 0" }}
                />
            </div>

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