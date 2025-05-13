import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Header />
        <main style={{ flex: 1, 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
        }}>
            <Outlet />
        </main>
    </div>
);

export default Layout;