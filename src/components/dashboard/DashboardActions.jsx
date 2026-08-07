import { Link } from "react-router-dom";

function DashboardActions() {
  const botoes = [
    {
      to: "/nova-compra",
      icone: "➕",
      titulo: "Nova Compra",
      descricao: "Registrar uma nova compra",
      cor: "#22c55e",
    },
    {
      to: "/compras",
      icone: "📋",
      titulo: "Minhas Compras",
      descricao: "Ver e gerenciar compras",
      cor: "#3b82f6",
    },
    {
      to: "/historico-precos",
      icone: "📈",
      titulo: "Histórico de Preços",
      descricao: "Acompanhar variações de preços",
      cor: "#8b5cf6",
    },
  ];

  return (
    <section
      style={{
        marginTop: "40px",
        marginBottom: "40px",
      }}
    >
      <div style={{ marginBottom: "18px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: "900",
          }}
        >
          ⚡ Ações rápidas
        </h2>

        <p
          style={{
            color: "#64748b",
            marginTop: "6px",
          }}
        >
          Acesse rapidamente os principais recursos.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "18px",
        }}
      >
        {botoes.map((botao) => (
          <Link
            key={botao.to}
            to={botao.to}
            style={{
              textDecoration: "none",
              color: "#fff",
              background:
                "linear-gradient(145deg, #1e293b, #0f172a)",
              border: `1px solid ${botao.cor}`,
              borderRadius: "18px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.20)",
              transition:
                "transform .2s ease, box-shadow .2s ease",
            }}
          >
            <span
              style={{
                width: "52px",
                height: "52px",
                flexShrink: 0,
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${botao.cor}20`,
                fontSize: "25px",
              }}
            >
              {botao.icone}
            </span>

            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "18px",
                  marginBottom: "5px",
                }}
              >
                {botao.titulo}
              </strong>

              <span
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                {botao.descricao}
              </span>
            </div>

            <span
              style={{
                marginLeft: "auto",
                fontSize: "22px",
                color: botao.cor,
              }}
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default DashboardActions;