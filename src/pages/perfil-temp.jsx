import { useNavigate } from "react-router-dom";

import { logout }
  from "../services/authService";

import { useAuth }
  from "../context/AuthContext";

function Perfil() {

  const { usuario } =
    useAuth();

  const navigate =
    useNavigate();

  async function sair() {

    try {

      await logout();

      navigate("/login");

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div
      style={{
        background: "#121212",
        minHeight: "100vh",
        color: "#fff",
        padding: "30px"
      }}
    >

      <h1>
        👤 Meu Perfil
      </h1>

      <div
        style={{
          background: "#1f1f1f",
          padding: "25px",
          borderRadius: "18px",
          marginTop: "25px"
        }}
      >

        <h2>
          Informações da Conta
        </h2>

        <p>
          <strong>Email:</strong>
          {" "}
          {
            usuario?.email ||
            "Visitante"
          }
        </p>

        <p>
          <strong>Tipo:</strong>
          {" "}
          {
            usuario?.isAnonymous
              ? "Visitante"
              : "Usuário Cadastrado"
          }
        </p>

      </div>

      <button
        onClick={sair}
        style={{
          marginTop: "25px",
          background: "#f44336",
          color: "#fff",
          border: "none",
          padding: "15px 20px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        🚪 Sair
      </button>

    </div>

  );

}

export default Perfil;