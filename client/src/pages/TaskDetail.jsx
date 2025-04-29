import { useParams, useNavigate } from "react-router";
import GlobalContext from "../context/GlobalContext";
import { useContext, useState } from "react";

// Components
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {

    const { tasks, removeTask, updateTask, dateFormat } = useContext(GlobalContext);
    const { id } = useParams();
    const navigate = useNavigate();

    // Modal
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);




    const task = tasks.find(e => e.id === parseInt(id));

    if (!task) {
        return <p>Loading task details...</p>;
    }

    // Deleted handle
    async function handleDelete() {
        try {
            await removeTask(task.id);
            alert('Task deleted successfully');
            navigate('/')
        } catch (err) {
            console.error("Error deleting task:", err);

        }
    }

    // Updated handle
    async function handleUpdate(updatedTask) {
        try {
            await updateTask(updatedTask);
            alert('Task updated successfully');
            setIsOpenUpdate(false)
        } catch (err) {
            console.error("Error deleting task:", err);
            alert(err.message)
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
                <p>Stato: <span style={statusStyle}>{task.status}</span> </p>
                <p>Creato: {dateFormat}</p>
                <div style={{ display: "flex", gap: "20px" }}>
                    <button type="button" onClick={() => setIsOpen(true)} style={{ backgroundColor: '#fa450d' }}>Elimina Task</button>
                    <button type="button" onClick={() => setIsOpenUpdate(true)} style={{ backgroundColor: '#ecae4f' }}>Modifica Task</button>
                </div>
            </div >

            <Modal
                title={task.title}
                content={<p>
                    Sei sicuro di voler <strong style={{ color: "red", textDecoration: "underline" }}>eliminare</strong> il task "{task.title}"?
                </p>}
                show={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleDelete}
                confirmText="Cancella"
            />

            <EditTaskModal
                task={task}
                show={isOpenUpdate}
                onClose={() => setIsOpenUpdate(false)}
                onSave={handleUpdate}
            />

        </>
    )
}