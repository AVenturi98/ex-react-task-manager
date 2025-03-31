import { Outlet } from "react-router";
import Nav from "../nav/Nav";

export default function DefaultLayout() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}