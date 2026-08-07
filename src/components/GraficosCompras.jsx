import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function GraficosCompras({ compras = [] }) {
  const dados = compras
    .slice()
    .reverse()
    .slice(-12)
    .map((compra, index) => ({
      numero: index + 1,
      data: compra.data || "-",
      total: Number(compra.total || 0),
    }));

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
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#2196f3",
            fontSize: "24px",
            fontWeight: "800",
          }}
        >
          📊 Valor por Compra
        </h2>

        <p
          style={{
            margin: "6px 0 0",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Compare os valores das suas últimas
          compras registradas.
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
            🛒
          </span>

          <strong
            style={{
              color: "#fff",
              fontSize: "18px",
            }}
          >
            Nenhuma compra registrada
          </strong>

          <p
            style={{
              marginTop: "8px",
              maxWidth: "400px",
              lineHeight: "1.6",
            }}
          >
            Registre sua primeira compra para
            começar a acompanhar seus gastos.
          </p>
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart
            data={dados}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              vertical={false}
            />

            <XAxis
              dataKey="numero"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
              label={{
                value: "Compras",
                position: "insideBottom",
                offset: -5,
                fill: "#64748b",
              }}
            />

            <YAxis
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
              tickFormatter={(valor) =>
                `R$ ${valor}`
              }
            />

            <Tooltip
              labelFormatter={(valor) => {
                const compra = dados[valor - 1];

                return compra
                  ? `Compra em ${compra.data}`
                  : "Compra";
              }}
              formatter={(valor) => [
                `R$ ${Number(valor).toFixed(2)}`,
                "Valor",
              ]}
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="total"
              fill="#2196f3"
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {compras.length > 12 && (
        <p
          style={{
            marginTop: "10px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          Exibindo as últimas 12 compras.
        </p>
      )}
    </div>
  );
}

export default GraficosCompras;