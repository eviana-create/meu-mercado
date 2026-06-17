import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

function HistoricoPrecos() {

  const [historico, setHistorico] =
    useState({});

  useEffect(() => {

    carregarHistorico();

  }, []);

  async function carregarHistorico() {

    try {

      const snapshot =
        await getDocs(
          collection(db, "compras")
        );

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
      </h1>

      {Object.keys(historico).map(
        (produto) => {

          const precos =
            historico[produto];

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

            </div>

          );

        }
      )}

    </div>

  );

}

export default HistoricoPrecos;