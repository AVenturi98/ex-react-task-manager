import { NavLink } from "react-router"

export default function Nav() {
    return (
        <header>
            <div className="navbar">
                <NavLink to='/'>
                    Tasks
                </NavLink>
                <NavLink to='add'>
                    New Task
                </NavLink>
            </div>
        </header>
    )
}