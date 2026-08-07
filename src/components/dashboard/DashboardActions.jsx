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
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* TÍTULO */}
      <div style={{ marginBottom: "18px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: "900",
            color: "#fff",
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

      {/* BOTÕES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "18px",
          width: "100%",
        }}
      >
        {botoes.map((botao) => (
          <Link
            key={botao.to}
            to={botao.to}
            style={{
              boxSizing: "border-box",
              width: "100%",
              minWidth: 0,
              textDecoration: "none",
              color: "#fff",

              background:
                "linear-gradient(145deg, #1e293b, #0f172a)",

              border: `1px solid ${botao.cor}`,
              borderRadius: "18px",

              padding: "20px",

              display: "flex",
              alignItems: "center",
              gap: "14px",

              boxShadow:
                "0 10px 30px rgba(0,0,0,.20)",

              transition:
                "transform .2s ease, box-shadow .2s ease",
            }}
          >
            {/* ÍCONE */}
            <span
              style={{
                width: "50px",
                height: "50px",
                minWidth: "50px",
                flexShrink: 0,

                borderRadius: "14px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                background:
                  `${botao.cor}20`,

                fontSize: "24px",
              }}
            >
              {botao.icone}
            </span>

            {/* TEXTO */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <strong
                style={{
                  display: "block",
                  fontSize: "17px",
                  marginBottom: "5px",

                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {botao.titulo}
              </strong>

              <span
                style={{
                  display: "block",
                  color: "#94a3b8",
                  fontSize: "13px",
                  lineHeight: "1.4",

                  overflowWrap: "break-word",
                }}
              >
                {botao.descricao}
              </span>
            </div>

            {/* SETA */}
            <span
              style={{
                flexShrink: 0,
                fontSize: "22px",
                color: botao.cor,
                marginLeft: "4px",
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