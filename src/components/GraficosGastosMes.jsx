import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function GraficosGastosMes({ compras }) {

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
    "Dez"
  ];

  const gastosPorMes = {};

  compras.forEach((compra) => {

    if (!compra.data) return;

    try {

      const [dia, mes] =
        compra.data.split("/");

      const nomeMes =
        meses[Number(mes) - 1];

      gastosPorMes[nomeMes] =
        (gastosPorMes[nomeMes] || 0) +
        Number(compra.total || 0);

    } catch {

      return;

    }

  });

  const dados = meses.map((mes) => ({
    mes,
    total:
      gastosPorMes[mes] || 0
  }));

  return (
    <div
      style={{
        background: "#1f1f1f",
        padding: "25px",
        borderRadius: "20px",
        marginTop: "40px"
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#4caf50"
        }}
      >
        📈 Gastos por Mês
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="mes" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="total"
            fill="#4caf50"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficosGastosMes;