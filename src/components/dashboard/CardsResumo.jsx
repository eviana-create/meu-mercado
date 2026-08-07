function CardsResumo({
  totalGasto,
  totalItens,
  media,
  gastoMes,
}) {
  const cards = [
    {
      icone: "💰",
      titulo: "Total Gasto",
      valor: `R$ ${totalGasto.toFixed(2)}`,
      destaque: "green",
    },
    {
      icone: "🛒",
      titulo: "Compras",
      valor: totalItens,
      destaque: "blue",
    },
    {
      icone: "📊",
      titulo: "Média por Compra",
      valor: `R$ ${media.toFixed(2)}`,
      destaque: "orange",
    },
    {
      icone: "📅",
      titulo: "Gasto do Mês",
      valor: `R$ ${gastoMes.toFixed(2)}`,
      destaque: "purple",
    },
  ];

  const cores = {
    green: {
      fundo: "#052e16",
      borda: "#166534",
      icone: "#22c55e",
      texto: "#4ade80",
    },
    blue: {
      fundo: "#172554",
      borda: "#1d4ed8",
      icone: "#3b82f6",
      texto: "#60a5fa",
    },
    orange: {
      fundo: "#431407",
      borda: "#c2410c",
      icone: "#f97316",
      texto: "#fb923c",
    },
    purple: {
      fundo: "#2e1065",
      borda: "#7e22ce",
      icone: "#a855f7",
      texto: "#c084fc",
    },
  };

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "18px",
        marginBottom: "30px",
      }}
    >
      {cards.map((card) => {
        const cor = cores[card.destaque];

        return (
          <article
            key={card.titulo}
            style={{
              background:
                "linear-gradient(145deg, #1e293b, #0f172a)",
              border: `1px solid ${cor.borda}`,
              borderRadius: "20px",
              padding: "24px",
              minHeight: "150px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.20)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: cor.icone,
                opacity: 0.08,
                right: "-35px",
                top: "-35px",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  background: `${cor.icone}20`,
                  fontSize: "22px",
                }}
              >
                {card.icone}
              </span>

              <span
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                {card.titulo}
              </span>
            </div>

            <strong
              style={{
                display: "block",
                color: "#fff",
                fontSize: "30px",
                fontWeight: "900",
                letterSpacing: "-0.5px",
              }}
            >
              {card.valor}
            </strong>
          </article>
        );
      })}
    </section>
  );
}

export default CardsResumo;