import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {

    const location = useLocation();
    const showHeader = location.pathname.startsWith("/mypage");

    return (
        <div style={{ height: "100dvh", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {showHeader && <Header />}
            <main style={{ flex: 1, 
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
            }}>
                <Outlet />
            </main>
        </div>
    )
};

export default Layout;