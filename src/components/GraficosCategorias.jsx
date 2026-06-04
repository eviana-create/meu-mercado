import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function GraficosCategorias({ compras }) {

  const categorias = {};

  compras.forEach((compra) => {

    compra.itens?.forEach((item) => {

      const categoria =
        item.categoria || "📦 Outros";

      categorias[categoria] =
        (categorias[categoria] || 0) +
        item.subtotal;

    });

  });

  const dados = Object.keys(categorias).map(
    (categoria) => ({
      name: categoria,
      value: categorias[categoria]
    })
  );

  const cores = [
    "#4caf50",
    "#2196f3",
    "#ff9800",
    "#9c27b0",
    "#e91e63",
    "#00bcd4"
  ];

  return (
    <div
      style={{
        background: "#1f1f1f",
        padding: "20px",
        borderRadius: "20px",
        marginTop: "30px"
      }}
    >
      <h2
        style={{
          marginBottom: "20px"
        }}
      >
        🍕 Gastos por Categoria
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <PieChart>

          <Pie
            data={dados}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {dados.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  cores[
                    index % cores.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficosCategorias;