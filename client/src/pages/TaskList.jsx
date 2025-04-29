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

    const { tasks, removeMultipleTasks } = useContext(GlobalContext);

    const searchRef = useRef();

    // Search value
    const [searchQuery, setSearchQuery] = useState('');

    // Debounce the search input
    const debouncedSearch = useCallback(debounce(setSearchQuery, 500), []);

    // State for order
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    // State for selected task
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);


    // Sort function
    // 1 = Ascending, -1 = Descending
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(prev => -prev)
        } else {
            setSortBy(column);
            setSortOrder(1)
        }
    }

    // Sort icon
    const sortIcon = sortOrder === 1 ? '↑' : '↓';

    // Sort and filter tasks
    const sortedTasks = useMemo(() => {
        return [...tasks]
            .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {

                let comparison;

                if (sortBy === 'title') {
                    comparison = a.title.localeCompare(b.title); // Order by title

                } else if (sortBy === 'status') {
                    const statusOrder = ['To do', 'Doing', 'Done'];
                    comparison = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status); // Order by status

                } else if (sortBy === 'createdAt') {
                    comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); // Order by createdAt
                }

                return comparison * sortOrder; // Apply sort order
            })

    }, [sortBy, sortOrder, tasks, searchQuery])


    const toggleSelection = (taskId) => {
        if (selectedTaskIds.includes(taskId)) {
            setSelectedTaskIds(selectedTaskIds.filter(id => id !== taskId));
        } else {
            setSelectedTaskIds(selectedTaskIds.push(taskId));
            setSelectedTaskIds([...selectedTaskIds]);
        }
    }

    const handleDelete = async () => {
        try {
            await removeMultipleTasks(selectedTaskIds);
            alert(`Tasks deleted successfully! ${selectedTaskIds}`);
            setSelectedTaskIds([]);
        } catch (err) {
            console.error("Failed to remove task:", err);
            alert(err.message)
        }
    }


    return (
        <>
            <div className="searchInput">
                <h2>Tasks</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
                    <input
                        type="text"
                        placeholder="Cerca task..."
                        onChange={e => debouncedSearch(e.target.value)}
                        ref={searchRef}
                        style={{ margin: "20px 0" }}
                    />
                    {selectedTaskIds.length >= 1 &&
                        <button
                            type="button"
                            onClick={handleDelete}
                            style={{ backgroundColor: "red" }}>
                            Elimina
                        </button>}
                </div>
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
                        <TaskRow key={e.id} item={e} onToggle={toggleSelection} checked={selectedTaskIds.includes(e.id)} />
                    ))}
                </tbody>

            </table>
        </>
    )
}