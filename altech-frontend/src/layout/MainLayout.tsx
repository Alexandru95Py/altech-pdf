import { Outlet, Link } from "react-router-dom";
import SidebarNav from "../components/Sidebarnav";

const MainLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SidebarNav />

      {/* Conținut principal */}
      <div style={{ flex: 1, padding: "2rem" }}>
        {/* Buton Acasă */}
        <div style={{ marginBottom: "1rem" }}>
          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "0.4rem 1rem",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              textDecoration: "none",
              color: "#333",
              fontWeight: "bold",
              border: "1px solid #ccc"
            }}
          >
            🏠 Acasă
          </Link>
        </div>

        {/* Aici se încarcă paginile */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;