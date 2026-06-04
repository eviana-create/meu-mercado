import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function GraficosCompras({ compras }) {

  const dados = compras.map((compra) => ({
    data: compra.data,
    total: Number(compra.total || 0)
  }));

  return (
    <div
      style={{
        background: "#1f1f1f",
        padding: "25px",
        borderRadius: "20px",
        marginTop: "30px"
      }}
    >
      <h2
        style={{
          marginBottom: "20px"
        }}
      >
        📊 Valor por Compra
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="data" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="total"
            fill="#2196f3"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficosCompras;