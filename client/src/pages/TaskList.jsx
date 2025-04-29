import { useContext, useState, useMemo, useRef, useCallback } from "react";
import GlobalContext from "../context/GlobalContext";
// Components
import TaskRow from "../components/TaskRow";
import Modal from "../components/Modal";

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
    const [selectedButton, setSelectedButton] = useState(true);


    // Modal confirm deleted selectedTaskIds
    const [isOpen, setIsOpen] = useState(false);



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

    const handleClose = () => {
        setIsOpen(false);
        setSelectedTaskIds([])
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
                    {selectedButton ?
                        <button
                            type="button"
                            onClick={() => setSelectedButton(false)}>
                            Seleziona
                        </button>
                        : !selectedButton && !selectedTaskIds.length >= 1 ?
                            <button
                                type="button"
                                onClick={() => setSelectedButton(true)}
                                style={{ backgroundColor: "#ccc" }}>
                                Annulla
                            </button>
                            : selectedTaskIds.length >= 1 && !selectedButton &&
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(true)}
                                    style={{ backgroundColor: "red" }}>
                                    Elimina
                                </button>

                                <Modal
                                    content={<div>
                                        Sei sicuro di voler <strong style={{ color: "red", textDecoration: "underline" }}>eliminare</strong> le tasks selezionate?
                                        <br />
                                        <p>selezionate {selectedTaskIds.length}</p>
                                    </div>}
                                    show={isOpen}
                                    onClose={handleClose}
                                    onConfirm={handleDelete}
                                    confirmText="Cancella"
                                />
                            </>}
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
                        <TaskRow key={e.id} item={e} onToggle={toggleSelection} checked={selectedTaskIds.includes(e.id)} show={!selectedButton} />
                    ))}
                </tbody>

            </table>
        </>
    )
}