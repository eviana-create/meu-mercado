import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function GraficosGastosMes({ compras = [] }) {
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const gastosPorMes = {};

  compras.forEach((compra) => {
    if (!compra.data) return;

    try {
      const [, mes] = compra.data.split("/");

      const nomeMes = meses[Number(mes) - 1];

      if (!nomeMes) return;

      gastosPorMes[nomeMes] =
        (gastosPorMes[nomeMes] || 0) +
        Number(compra.total || 0);
    } catch {
      return;
    }
  });

  const dados = meses.map((mes) => ({
    mes,
    total: gastosPorMes[mes] || 0,
  }));

  const possuiDados = dados.some(
    (item) => item.total > 0
  );

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
            color: "#4caf50",
            fontSize: "24px",
            fontWeight: "800",
          }}
        >
          📈 Gastos por Mês
        </h2>

        <p
          style={{
            margin: "6px 0 0",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Acompanhe como seus gastos variam durante o ano.
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
            📊
          </span>

          <strong
            style={{
              color: "#fff",
              fontSize: "18px",
            }}
          >
            Ainda não há gastos registrados
          </strong>

          <p
            style={{
              marginTop: "8px",
              maxWidth: "400px",
              lineHeight: "1.6",
            }}
          >
            Adicione algumas compras para começar
            a visualizar seus gastos por mês.
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
              dataKey="mes"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
            />

            <YAxis
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
              tickFormatter={(valor) =>
                `R$ ${valor}`
              }
            />

            <Tooltip
              formatter={(valor) => [
                `R$ ${Number(valor).toFixed(2)}`,
                "Gasto",
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
              fill="#4caf50"
              radius={[8, 8, 0, 0]}
              maxBarSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default GraficosGastosMes;