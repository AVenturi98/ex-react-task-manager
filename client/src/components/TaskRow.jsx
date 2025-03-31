import * as React from "react";

const TaskRow = React.memo(({ item }) => {

    const { title, status, createdAt } = item;

    const statusStyle = {
        color: status === "To do" ? "red" :
            status === "Doing" ? "orange" :
                status === "Done" ? "green" : "",
    };

    return (
        <tr>
            <td>{title}</td>
            <td style={statusStyle}>{status}</td>
            <td>{new Date(createdAt).toLocaleDateString()}</td>
        </tr>
    )
})

export default TaskRow