import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid,
Legend
} from "recharts";

import {
collection,
getDocs,
query,
where
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";

import { db } from "../firebase/firebaseConfig";

function HistoricoPrecos() {

const { usuario } = useAuth();

if (usuario?.isAnonymous) {

return (

<div
  style={{
    padding: "30px",
    color: "#fff"
  }}
>

  <h1>
    🔒 Recurso Premium
  </h1>

  <p>
    Crie uma conta gratuita para
    visualizar o Histórico de Preços.
  </p>

</div>


);

}

const [historico, setHistorico] =
useState({});

useEffect(() => {

if (usuario) {
carregarHistorico();
}

}, [usuario]);

async function carregarHistorico() {

if (!usuario) return;

try {

  const q = query(


collection(db, "compras"),
where("uid", "==", usuario.uid)
);

const snapshot = await getDocs(q);

  const produtos = {};

  snapshot.docs.forEach((doc) => {

    const compra =
      doc.data();

    compra.itens?.forEach(
      (item) => {

        const nome =
          item.nome;

        if (!produtos[nome]) {

          produtos[nome] = [];

        }

        produtos[nome].push({
          valor: Number(item.valor),
          data: compra.data
        });

      }
    );

  });

  console.log("Produtos:", produtos);
  console.log("Quantidade:", Object.keys(produtos).length);
  setHistorico(produtos);

} catch (error) {

  console.error(error);

}


}

return (

<div
  style={{
    padding: "30px",
    background: "#121212",
    minHeight: "100vh",
    color: "#fff"
  }}
>

  <h1>
    📈 Histórico de Preços
  </h1><br></br><br></br>

  <Link
            to="/nova-compra"
            style={{
              background: "#4caf50",
              color: "#fff",
              padding: "15px 25px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            ➕ Nova Compra
          </Link>

  {Object.keys(historico).map(
    (produto) => {

      const precos =
        historico[produto];

        /* ORDENA POR DATA */
        precos.sort((a, b) => {

        const [diaA, mesA, anoA] =
          a.data.split("/");

        const [diaB, mesB, anoB] =
          b.data.split("/");

        const dataA =
          new Date(anoA, mesA - 1, diaA);

        const dataB =
          new Date(anoB, mesB - 1, diaB);

        return dataA - dataB;

      });

      const dadosGrafico = precos.map((item) => ({
        data: item.data,
        preco: item.valor
      }));

      const menor =
        Math.min(
          ...precos.map(
            (p) => p.valor
          )
        );


      const maior =
        Math.max(
          ...precos.map(
            (p) => p.valor
          )
        );

      const ultimo =
        precos[
          precos.length - 1
        ]?.valor;

        const primeiro =
        precos[0]?.valor || 0;

      const variacao =
        ultimo - primeiro;

      const percentual =
        primeiro > 0
          ? ((variacao / primeiro) * 100)
          : 0;

          const corLinha =
            variacao > 0
              ? "#f44336"
              : variacao < 0
              ? {corLinha}
              : "#2196f3";

      return (

        <div
          key={produto}
          style={{
            background: "#1f1f1f",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "15px"
          }}
        >

          <h2>
            {produto}
          </h2>

          <ResponsiveContainer
            width="100%"
            height={250}
          >
            <LineChart
              data={dadosGrafico}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="data"
              />

              <YAxis />

              <Tooltip
                formatter={(value) => [
                  `R$ ${Number(value).toFixed(2)}`,
                  "Preço"
                ]}
                labelFormatter={(label) =>
                  `Data: ${label}`
                }
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="preco"
                stroke="#4caf50"
                strokeWidth={4}
                dot={{
                  r: 5
                }}
                activeDot={{
                  r: 8
                }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
                height: "120px",
                marginTop: "15px",
                marginBottom: "15px"
              }}
            >

        {precos.map((preco, index) => {

const altura =
  (preco.valor / maior) * 100;

return (

  <div
    key={index}
    title={`${preco.data} - R$ ${preco.valor}`}
    style={{
      width: "30px",
      height: `${altura}%`,
      background: "#4caf50",
      borderRadius: "6px 6px 0 0"
        }}
      />

    );

  })}
</div>

          <p>
            🟢 Menor preço:
            R$ {menor.toFixed(2)}
          </p>

          <p>
            🔴 Maior preço:
            R$ {maior.toFixed(2)}
          </p>

          <p>
            🔵 Último preço:
            R$ {ultimo.toFixed(2)}
          </p>

        <p
          style={{
            color:
              variacao > 0
                ? "#f44336"
                : variacao < 0
                ? "#4caf50"
                : "#fff",
            fontWeight: "bold"
          }}
        >
          {variacao > 0
            ? `📈 Subiu ${percentual.toFixed(1)}%`
            : variacao < 0
            ? `📉 Caiu ${Math.abs(percentual).toFixed(1)}%`
            : "➖ Sem alteração"}
        </p>
        </div>

      );

    }
  )}<br></br><br></br>
  
       <div
    style={{
      display: "flex",
      gap: "20px",
      flexWrap: "wrap"
    }}
  >
        <Link
          to="/nova-compra"
          style={{
            background: "#4caf50",
            color: "#fff",
            padding: "15px 25px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          ➕ Nova Compra
        </Link>
        </div>
</div>


);

}

export default HistoricoPrecos;