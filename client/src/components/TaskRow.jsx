import * as React from "react";
import { Link } from "react-router";

const TaskRow = React.memo(({ item }) => {

    const { id, title, status, createdAt } = item;

    const statusStyle = {
        color: status === "To do" ? "red" :
            status === "Doing" ? "orange" :
                status === "Done" ? "green" : "",
    };

    return (
        <tr>
            <td>
                <Link to={`/task/${id}`}>
                    {title}
                </Link>
            </td>
            <td style={statusStyle}>{status}</td>
            <td>{new Date(createdAt).toLocaleDateString()}</td>
        </tr>
    )
})

export default TaskRow