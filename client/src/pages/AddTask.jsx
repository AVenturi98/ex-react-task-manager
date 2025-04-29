import { useState, useRef, useMemo, useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function AddTask() {

    const { addTask, tasks } = useContext(GlobalContext);

    const [title, setTitle] = useState('');
    const description = useRef();
    const status = useRef();

    const symbols = '!@#$%^&*()-_=+[]{}|;:\'\\,.<>?/`~';

    const taskErrore = useMemo(() => {
        if (!title.trim()) {
            return 'Title is required'
        }
        if ([...title].some(e => symbols.includes(e))) {
            return 'Title cannot contain special characters'
        }
        if (title.length <= 2) {
            return 'Title required 3 character min'
        }
        return ''
    }, [title])

    async function submitForm(e) {
        e.preventDefault();

        if (taskErrore)
            return;

        const newTask = {
            title: title.trim(),
            description: description.current.value.trim(),
            status: status.current.value,
        }

        try {
            if (tasks.filter(t => t.title.toLowerCase() === newTask.title.toLowerCase()).length > 0) {
                alert('Task already exists!')
                return;
            } else {
                await addTask(newTask);
                setTitle('');
                description.current.value = '';
                status.current.value = 'To do';
                alert('Task added successfully');
            }

        } catch (err) {
            alert(err.message)
        }

    }

    return (
        <form onSubmit={submitForm}>
            <h2>Title</h2>
            <input
                type="text"
                placeholder="Title"
                maxLength={100}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {taskErrore &&
                < div className="error">{taskErrore}</div>
            }
            <h2>Description</h2>
            <input
                type="textarea"
                placeholder="Descrizione"
                maxLength={200}
                ref={description}
            />
            <h2>Status</h2>
            <select
                name="status"
                ref={status}>
                {['To do', 'Doing', 'Done'].map((e, i) => (
                    <option key={i} value={e}>{e}</option>
                ))}
            </select>
            <button
                type='button'
                onClick={submitForm}
                disabled={taskErrore}>
                Aggiungi
            </button>
        </form >
    )
}