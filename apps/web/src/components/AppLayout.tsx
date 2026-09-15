import { NavLink, Outlet } from "react-router-dom";
import "./AppLayout.css";

function AppLayout() {
    return (
        <div>
            <header>
                <h1>PropertyFlow</h1>

                <nav className="app-nav">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/properties"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Properties
                    </NavLink>
                    <NavLink
                        to="/maintenance"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Maintenance
                    </NavLink>
                </nav>
            </header>

            <hr />

            <Outlet />
        </div>
    );
}

export default AppLayout;