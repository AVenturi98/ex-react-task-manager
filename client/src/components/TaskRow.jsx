import * as React from "react";
import { Link } from "react-router";
import GlobalContext from "../context/GlobalContext";

const TaskRow = React.memo(({ item, checked, onToggle = () => { }, show = true }) => {

    const { id, title, status } = item;

    const { dateFormat } = React.useContext(GlobalContext)

    const statusStyle = {
        color: status === "To do" ? "red" :
            status === "Doing" ? "orange" :
                status === "Done" ? "green" : "",
    };

    return (
        <tr>
            <td style={{ display: "flex", alignItems: "center" }}>

                {show &&
                    <input
                        type="checkbox"
                        checked={checked}
                        show={show.value}
                        onChange={() => onToggle(id)}
                        style={{ marginRight: "15px" }} />}

                <Link to={`/task/${id}`}>
                    {title}
                </Link>
            </td>
            <td style={statusStyle}>{status}</td>
            <td>{dateFormat}</td>
        </tr>
    )
})

export default TaskRow