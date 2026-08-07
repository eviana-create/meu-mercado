import { Link } from "react-router-dom";

function DashboardHeader({ visitante }) {
  return (
    <header
      style={{
        marginBottom: "35px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: "900",
              margin: 0,
            }}
          >
            🛒 Meu Mercado
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px",
              marginTop: "10px",
            }}
          >
            Controle suas compras e seus gastos
            de forma simples.
          </p>
        </div>

        <Link
          to="/perfil"
          style={{
            background: "#f59e0b",
            color: "#fff",
            padding: "13px 22px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          👤 Perfil
        </Link>
      </div>

      {visitante && (
        <div
          style={{
            marginTop: "25px",
            background:
              "linear-gradient(135deg, #f59e0b, #ea580c)",
            padding: "22px",
            borderRadius: "18px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,.25)",
          }}
        >
          <h3
            style={{
              margin: "0 0 8px",
              fontSize: "20px",
            }}
          >
            👋 Você está no Modo Visitante
          </h3>

          <p
            style={{
              margin: "0 0 16px",
              lineHeight: "1.6",
            }}
          >
            Você pode experimentar o Meu Mercado
            gratuitamente. Crie uma conta para
            manter seus dados salvos e desbloquear
            novos recursos.
          </p>

          <Link
            to="/cadastro"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#ea580c",
              padding: "12px 20px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "900",
            }}
          >
            🚀 Criar Conta Grátis
          </Link>
        </div>
      )}
    </header>
  );
}

export default DashboardHeader;