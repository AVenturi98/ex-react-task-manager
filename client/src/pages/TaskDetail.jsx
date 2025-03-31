import { useParams } from "react-router";
import GlobalContext from "../context/GlobalContext";
import { useContext } from "react";

export default function TaskDetail() {

    const { tasks } = useContext(GlobalContext);
    const { id } = useParams();

    const task = tasks.find(e => e.id === parseInt(id));

    if (!task) {
        return <p>Loading task details...</p>;
    }

    function handleDelete() {
        console.log("deleted item with id:", id)
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
                <button type="button" onClick={handleDelete} style={{ backgroundColor: '#fa450d' }}>Delete Task</button>
            </div >
        </>
    )
}