import * as React from 'react';
import Modal from './Modal';

export default function EditTaskModal({
    show = false,
    onClose = () => { },
    task = {},
    onSave = () => { }
}) {

    const [editedTask, setEditedTask] = React.useState(task);
    const editFormRef = React.useRef();

    const changeEditedTask = (key, event) => {
        setEditedTask(prev => ({ ...prev, [key]: event.target.value }))
    }

    const { title, description, status } = editedTask;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedTask)
    }

    return (
        <>
            <Modal
                title="Modifica Task"
                content={
                    <form ref={editFormRef} onSubmit={handleSubmit}>
                        <label>
                            <strong>
                                Nome Task:
                            </strong>
                            <input
                                style={{ width: "100%" }}
                                type="text"
                                value={title}
                                onChange={e => changeEditedTask('title', e)}
                            />
                        </label>
                        <label>
                            <strong>
                                Descrizione:
                            </strong>
                            <textarea
                                style={{ width: "100%" }}
                                type="text"
                                maxLength={200}
                                value={description}
                                onChange={e => changeEditedTask('description', e)}
                            />
                        </label>
                        <label>
                            <strong>
                                Stato:
                            </strong>
                            <select
                                style={{ width: "100%" }}
                                value={status}
                                onChange={e => changeEditedTask('status', e)}
                            >
                                {['To do', 'Doing', 'Done'].map((e, i) => (
                                    <option value={e} key={i}>{e}</option>
                                ))}
                            </select>
                        </label>
                    </form>

                }
                confirmText='Salva'
                show={show}
                onClose={onClose}
                onConfirm={() => editFormRef.current.requestSubmit()}
            />
        </>
    )
}