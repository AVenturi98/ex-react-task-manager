import { useParams, useNavigate } from "react-router";
import GlobalContext from "../context/GlobalContext";
import { useContext, useState } from "react";

// Components
import Modal from "../components/Modal";

export default function TaskDetail() {

    const { tasks, removeTask } = useContext(GlobalContext);
    const { id } = useParams();
    const navigate = useNavigate();

    // Modal
    const [isOpen, setIsOpen] = useState(false);

    const task = tasks.find(e => e.id === parseInt(id));

    if (!task) {
        return <p>Loading task details...</p>;
    }

    async function handleDelete() {
        try {
            await removeTask(task.id);
            alert('Task deleted successfully');
            navigate('/')
        } catch (err) {
            console.error("Error deleting task:", err);

        }
    }

    const statusStyle = {
        color: task.status === "To do" ? "red" :
            task.status === "Doing" ? "orange" :
                task.status === "Done" ? "green" : "",
    };



    return (
        <>

            <div style={{ padding: '30px', border: '1px solid #333', margin: '20px', borderRadius: '10px', lineHeight: '55px' }}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Status: <span style={statusStyle}>{task.status}</span> </p>
                <p>Created At: {new Date(task.createdAt).toLocaleDateString()}</p>
                <button type="button" onClick={() => setIsOpen(true)} style={{ backgroundColor: '#fa450d' }}>Delete Task</button>
            </div >
            <Modal
                title={task.title}
                content={`Sei sicuro di voler eliminare il task "${task.title}"?`}
                show={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleDelete}
                confirmText="Delete"
            />
        </>
    )
}