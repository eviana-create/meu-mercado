function DashboardInsights({
  produtoMaisComprado,
  totalProdutos,
  categoriaFavorita,
  maiorCompra,
  produtoMaisCaro,
  ultimaCompra,
  economiaTotal,
}) {
  const temCompras =
    totalProdutos > 0 ||
    maiorCompra ||
    ultimaCompra ||
    produtoMaisCaro;

  const insights = [
    {
      icone: "🥇",
      titulo: "Mais comprado",
      valor: produtoMaisComprado || "Nenhum produto",
      detalhe:
        totalProdutos > 0
          ? `${totalProdutos} produtos registrados`
          : "Registre sua primeira compra",
      cor: "#f59e0b",
    },

    {
      icone: "🏷️",
      titulo: "Categoria favorita",
      valor: categoriaFavorita || "Nenhuma",
      detalhe:
        categoriaFavorita
          ? "Categoria mais presente nas compras"
          : "Ainda não há categorias",
      cor: "#8b5cf6",
    },

    {
      icone: "💎",
      titulo: "Maior compra",
      valor: maiorCompra
        ? `R$ ${Number(
            maiorCompra.total || 0
          ).toFixed(2)}`
        : "Nenhuma compra",
      detalhe: maiorCompra?.data
        ? `Realizada em ${maiorCompra.data}`
        : "Sua maior compra aparecerá aqui",
      cor: "#ec4899",
    },

    {
      icone: "🛍️",
      titulo: "Última compra",
      valor: ultimaCompra
        ? `R$ ${Number(
            ultimaCompra.total || 0
          ).toFixed(2)}`
        : "Nenhuma compra",
      detalhe: ultimaCompra?.data
        ? `Realizada em ${ultimaCompra.data}`
        : "Registre uma compra para acompanhar",
      cor: "#06b6d4",
    },

    {
      icone: "💰",
      titulo: "Produto mais caro",
      valor:
        produtoMaisCaro?.nome ||
        "Nenhum produto",
      detalhe: produtoMaisCaro
        ? `R$ ${Number(
            produtoMaisCaro.valor || 0
          ).toFixed(2)}`
        : "Ainda não há produtos registrados",
      cor: "#ef4444",
    },

    {
      icone: "📉",
      titulo: "Economia detectada",
      valor: `R$ ${Number(
        economiaTotal || 0
      ).toFixed(2)}`,
      detalhe:
        economiaTotal > 0
          ? "Você encontrou preços melhores"
          : "Continue comparando preços",
      cor: "#22c55e",
    },
  ];

  return (
    <section
      style={{
        marginBottom: "40px",
      }}
    >
      {/* CABEÇALHO */}
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(24px, 4vw, 30px)",
            fontWeight: "900",
            color: "#fff",
          }}
        >
          🧠 Insights das suas compras
        </h2>

        <p
          style={{
            marginTop: "7px",
            marginBottom: 0,
            color: "#94a3b8",
            fontSize: "15px",
            lineHeight: "1.6",
          }}
        >
          Informações úteis para entender
          seus hábitos de consumo.
        </p>
      </div>

      {/* ESTADO VAZIO */}
      {!temCompras && (
        <div
          style={{
            marginBottom: "20px",
            padding: "22px",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg, #172033, #111827)",
            border: "1px solid #334155",
            color: "#cbd5e1",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              marginBottom: "8px",
            }}
          >
            🛒
          </div>

          <h3
            style={{
              margin: "0 0 7px",
              color: "#fff",
              fontSize: "19px",
              fontWeight: "900",
            }}
          >
            Ainda não temos dados suficientes
          </h3>

          <p
            style={{
              margin: 0,
              lineHeight: "1.6",
              color: "#94a3b8",
            }}
          >
            Registre sua primeira compra e o
            Meu Mercado começará a analisar
            automaticamente seus hábitos.
          </p>
        </div>
      )}

      {/* CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "18px",
        }}
      >
        {insights.map((item) => (
          <article
            key={item.titulo}
            style={{
              position: "relative",
              overflow: "hidden",
              background:
                "linear-gradient(145deg, #1e293b, #111827)",
              border: "1px solid #334155",
              borderRadius: "20px",
              padding: "22px",
              minHeight: "155px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.18)",
              transition:
                "transform .2s ease, border-color .2s ease",
            }}
          >
            {/* DETALHE VISUAL */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "80px",
                height: "80px",
                background: item.cor,
                opacity: 0.08,
                borderRadius: "0 0 0 80px",
              }}
            />

            {/* TÍTULO */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  width: "42px",
                  height: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  background: `${item.cor}20`,
                  fontSize: "21px",
                  flexShrink: 0,
                }}
              >
                {item.icone}
              </span>

              <span
                style={{
                  color: "#cbd5e1",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
              >
                {item.titulo}
              </span>
            </div>

            {/* VALOR */}
            <h3
              style={{
                margin: 0,
                color: "#fff",
                fontSize: "21px",
                fontWeight: "900",
                lineHeight: "1.3",
                wordBreak: "break-word",
              }}
            >
              {item.valor}
            </h3>

            {/* DETALHE */}
            <p
              style={{
                margin: "9px 0 0",
                color: "#64748b",
                fontSize: "13px",
                lineHeight: "1.5",
              }}
            >
              {item.detalhe}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DashboardInsights;