import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SidebarNav = () => {
  const { isAuthenticated } = useAuth();

  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "1rem",
        position: "relative",
      }}
    >
      <h3>ALTech PDF</h3>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {isAuthenticated ? (
            <>
              <li><Link to="/create" style={{ color: "white" }}>Creează</Link></li>
              <li><Link to="/tools" style={{ color: "white" }}>Unelte PDF</Link></li>
              <li><Link to="/myfiles" style={{ color: "white" }}>Fișierele Mele</Link></li>
              <li><Link to="/notifications" style={{ color: "white" }}>Notificări</Link></li>
              <li><Link to="/support" style={{ color: "white" }}>Suport</Link></li>
              <li><Link to="/about" style={{ color: "white" }}>Despre</Link></li>
              <li><Link to="/ProtectDocument" style={{ color: "white" }}>Protejează Documente</Link></li>

              {/* Buton AI fancy */}
              <li style={{ marginTop: "2rem" }}>
                <Link
                  to="/ai-chat"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem",
                    backgroundColor: "#00cec9",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "#2d3436",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#81ecec")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00cec9")}
                >
                  <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>🤖</span>
                  Întreabă AI-ul
                </Link>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" style={{ color: "white" }}>Autentificare</Link></li>
              <li><Link to="/register" style={{ color: "white" }}>Înregistrare</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* Buton logout minimalist și centrat jos */}
      {isAuthenticated && (
        <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)" }}>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
            }}
            title="Delogare"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 2v10m0 10a10 10 0 1 0 0-20" />
            </svg>
          </button>
        </div>
      )}
    </aside>
  );
};

export default SidebarNav;