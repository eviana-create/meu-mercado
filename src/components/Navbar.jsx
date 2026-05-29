import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#1f1f1f",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #333"
      }}
    >
      <h2 style={{ color: "#4caf50" }}>
        🛒 Meu Mercado
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px"
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none"
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/adicionar"
          style={{
            color: "#fff",
            textDecoration: "none"
          }}
        >
          Adicionar Compra
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;