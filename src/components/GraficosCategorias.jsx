import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function GraficosCategorias({ compras = [] }) {
  const categorias = {};

  compras.forEach((compra) => {
    compra.itens?.forEach((item) => {
      const categoria =
        item.categoria || "Outros";

      categorias[categoria] =
        (categorias[categoria] || 0) +
        Number(item.subtotal || 0);
    });
  });

  const dados = Object.keys(categorias).map(
    (categoria) => ({
      name: categoria,
      value: categorias[categoria],
    })
  );

  const cores = [
    "#4caf50",
    "#2196f3",
    "#ff9800",
    "#9c27b0",
    "#e91e63",
    "#00bcd4",
  ];

  const possuiDados = dados.length > 0;

  return (
    <div
      style={{
        background: "#1f1f1f",
        padding: "25px",
        borderRadius: "20px",
        marginTop: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,.18)",
        border: "1px solid rgba(255,255,255,.05)",
      }}
    >
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "800",
            color: "#fff",
          }}
        >
          🏷️ Gastos por Categoria
        </h2>

        <p
          style={{
            margin: "6px 0 0",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Veja quais categorias estão consumindo
          mais do seu orçamento.
        </p>
      </div>

      {!possuiDados ? (
        <div
          style={{
            minHeight: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            color: "#94a3b8",
            padding: "30px",
          }}
        >
          <span
            style={{
              fontSize: "48px",
              marginBottom: "15px",
            }}
          >
            🏷️
          </span>

          <strong
            style={{
              color: "#fff",
              fontSize: "18px",
            }}
          >
            Nenhuma categoria disponível
          </strong>

          <p
            style={{
              marginTop: "8px",
              maxWidth: "400px",
              lineHeight: "1.6",
            }}
          >
            Suas categorias aparecerão aqui
            depois que você registrar suas compras.
          </p>
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>
            <Pie
              data={dados}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={115}
              innerRadius={55}
              paddingAngle={3}
              label
            >
              {dados.map((entry, index) => (
                <Cell
                  key={`${entry.name}-${index}`}
                  fill={
                    cores[
                      index % cores.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(valor) => [
                `R$ ${Number(valor).toFixed(2)}`,
                "Total",
              ]}
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend
              wrapperStyle={{
                color: "#cbd5e1",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default GraficosCategorias;