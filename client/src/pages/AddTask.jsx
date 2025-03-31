import { useState, useRef, useMemo } from "react";

export default function AddTask() {

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
        return ''
    }, [title])

    function submitForm(e) {
        e.preventDefault();

        if (taskErrore)
            return;

        const newTask = {
            title: title.trim(),
            description: description.current.value.trim(),
            status: status.current.value,
        }

        console.log(newTask)

    }

    return (
        <form onSubmit={submitForm}>
            <h2>Title</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {taskErrore &&
                <div className="error">{taskErrore}</div>
            }
            <h2>Description</h2>
            <input
                type="textarea"
                placeholder="Descrizione"
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
        </form>
    )
}