import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import GraficosGastosMes from "../components/GraficosGastosMes";
import GraficosCategorias from "../components/GraficosCategorias";
import GraficosCompras from "../components/GraficosCompras";

import {
  collection,
  onSnapshot
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

function Dashboard() {

  const [compras, setCompras] = useState([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "compras"),
      (snapshot) => {

        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setCompras(lista);

      }
    );

    return () => unsubscribe();

  }, []);

  /* TOTAL GASTO */
  const totalGasto = compras.reduce(
    (acc, compra) =>
      acc + Number(compra.total || 0),
    0
  );

  /* TOTAL DE COMPRAS */
  const totalItens = compras.length;

  /* MÉDIA */
  const media =
    totalItens > 0
      ? totalGasto / totalItens
      : 0;

  /* MÊS ATUAL */
  const mesAtual = new Date().getMonth();
  const anoAtual = new Date().getFullYear();

  /* GASTO DO MÊS */
  const gastoMes = compras.reduce(
    (acc, compra) => {

      if (!compra.data) return acc;

      try {

        const [dia, mes, ano] =
          compra.data.split("/");

        const dataCompra =
          new Date(
            Number(ano),
            Number(mes) - 1,
            Number(dia)
          );

        if (
          dataCompra.getMonth() === mesAtual &&
          dataCompra.getFullYear() === anoAtual
        ) {

          return (
            acc +
            Number(compra.total || 0)
          );

        }

      } catch {

        return acc;

      }

      return acc;

    },
    0
  );

  /* CONTADOR DE PRODUTOS */
  const contadorProdutos = {};

  compras.forEach((compra) => {

    if (!compra.itens) return;

    compra.itens.forEach((item) => {

      const nomeProduto =
        item.nome || "Sem nome";

      const quantidade =
        Number(item.quantidade || 1);

      contadorProdutos[nomeProduto] =
        (contadorProdutos[nomeProduto] || 0) +
        quantidade;

    });

  });

  /* MAIS COMPRADO */
  const produtoMaisComprado =
    Object.keys(contadorProdutos).length > 0
      ? Object.keys(contadorProdutos).reduce(
          (a, b) =>
            contadorProdutos[a] >
            contadorProdutos[b]
              ? a
              : b
        )
      : "Nenhum";

  /* TOTAL DE PRODUTOS */
  const totalProdutos =
    Object.values(contadorProdutos).reduce(
      (acc, qtd) =>
        acc + Number(qtd || 0),
      0
    );

    /* GASTO HOJE */
const hoje = new Date().toLocaleDateString("pt-BR");

const gastoHoje = compras.reduce(
  (acc, compra) => {

    if (compra.data === hoje) {
      return acc + Number(compra.total || 0);
    }

    return acc;

  },
  0
);

/* ÚLTIMA COMPRA */
const ultimaCompra =
  compras.length > 0
    ? compras
        .sort((a, b) => {

          const [diaA, mesA, anoA] =
            a.data.split("/");

          const [diaB, mesB, anoB] =
            b.data.split("/");

          const dataA = new Date(
            anoA,
            mesA - 1,
            diaA
          );

          const dataB = new Date(
            anoB,
            mesB - 1,
            diaB
          );

          return dataB - dataA;

        })[0]
    : null;

/* CATEGORIA FAVORITA */
const contadorCategorias = {};

compras.forEach((compra) => {

  compra.itens?.forEach((item) => {

    const categoria =
      item.categoria || "Outros";

    contadorCategorias[categoria] =
      (contadorCategorias[categoria] || 0) +
      item.quantidade;

  });

});

const categoriaFavorita =
  Object.keys(contadorCategorias).length > 0
    ? Object.keys(contadorCategorias).reduce(
        (a, b) =>
          contadorCategorias[a] >
          contadorCategorias[b]
            ? a
            : b
      )
    : "Nenhuma";

    /* MAIOR COMPRA */

const maiorCompra =
  compras.length > 0
    ? compras.reduce((maior, atual) =>
        Number(atual.total || 0) >
        Number(maior.total || 0)
          ? atual
          : maior
      )
    : null;

/* PRODUTO MAIS CARO */

let produtoMaisCaro = null;

compras.forEach((compra) => {

  compra.itens?.forEach((item) => {

    if (
      !produtoMaisCaro ||
      Number(item.valor) >
        Number(produtoMaisCaro.valor)
    ) {

      produtoMaisCaro = item;

    }

  });

});

/* ECONOMIA DETECTADA */

let economiaTotal = 0;

const historicoPrecos = {};

compras.forEach((compra) => {

  compra.itens?.forEach((item) => {

    const nome =
      item.nome.toLowerCase();

    const precoAtual =
      Number(item.valor);

    if (
      historicoPrecos[nome] !== undefined
    ) {

      const precoAnterior =
        historicoPrecos[nome];

      if (
        precoAtual < precoAnterior
      ) {

        economiaTotal +=
          (precoAnterior -
            precoAtual) *
          Number(item.quantidade || 1);

      }

    }

    historicoPrecos[nome] =
      precoAtual;

  });

});

  return (
    <div
      style={{
        background: "#121212",
        minHeight: "100vh",
        color: "#fff",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >

      {/* TOPO */}
      <div
        style={{
          marginBottom: "40px"
        }}
      >

        <h1
          style={{
            fontSize: "48px",
            marginBottom: "15px"
          }}
        >
          🛒 Meu Mercado
        </h1>

        <p
          style={{
            color: "#ccc",
            fontSize: "18px",
            lineHeight: "1.8",
            maxWidth: "800px"
          }}
        >
          Organize suas compras mensais e diárias
          de forma simples, rápida e segura.
          Controle seus gastos e mantenha tudo
          salvo na nuvem ☁️
        </p>

      </div>

      {/* CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          marginBottom: "50px"
        }}
      >

        <div
  style={{
    background: "#1f1f1f",
    padding: "30px",
    borderRadius: "20px"
  }}
>
  <h2
    style={{
      color: "#ffc107",
      marginBottom: "15px"
    }}
  >
    🏆 Maior Compra
  </h2>

  {maiorCompra ? (
    <>
      <p>{maiorCompra.data}</p>

      <h1>
        R$ {Number(
          maiorCompra.total
        ).toFixed(2)}
      </h1>
    </>
  ) : (
    <p>Nenhuma compra</p>
  )}
</div>

<div
  style={{
    background: "#1f1f1f",
    padding: "30px",
    borderRadius: "20px"
  }}
>
  <h2
    style={{
      color: "#00e5ff",
      marginBottom: "15px"
    }}
  >
    💎 Produto Mais Caro
  </h2>

  {produtoMaisCaro ? (
    <>
      <h3>
        {produtoMaisCaro.nome}
      </h3>

      <h1>
        R$ {Number(
          produtoMaisCaro.valor
        ).toFixed(2)}
      </h1>
    </>
  ) : (
    <p>Nenhum produto</p>
  )}
</div>

<div
  style={{
    background: "#1f1f1f",
    padding: "30px",
    borderRadius: "20px"
  }}
>
  <h2
    style={{
      color: "#4caf50",
      marginBottom: "15px"
    }}
  >
    📉 Economia Detectada
  </h2>

  <h1>
    R$ {economiaTotal.toFixed(2)}
  </h1>

  <p>
    Comparando preços mais baratos
    encontrados ao longo do tempo.
  </p>
</div>

        <div
  style={{
    background: "#1f1f1f",
    padding: "30px",
    borderRadius: "20px"
  }}
>
  <h2
    style={{
      color: "#00bcd4",
      marginBottom: "15px"
    }}
  >
    💵 Gasto Hoje
  </h2>

  <h1>
    R$ {gastoHoje.toFixed(2)}
  </h1>
</div>

<div
  style={{
    background: "#1f1f1f",
    padding: "30px",
    borderRadius: "20px"
  }}
>
  <h2
    style={{
      color: "#8bc34a",
      marginBottom: "15px"
    }}
  >
    🕒 Última Compra
  </h2>

  {ultimaCompra ? (
    <>
      <p>{ultimaCompra.data}</p>

      <h3>
        R$ {Number(
          ultimaCompra.total || 0
        ).toFixed(2)}
      </h3>

      <p>
        {ultimaCompra.itens?.length || 0}
        {" "}itens
      </p>
    </>
  ) : (
    <p>Nenhuma compra</p>
  )}
</div>

<div
  style={{
    background: "#1f1f1f",
    padding: "30px",
    borderRadius: "20px"
  }}
>
  <h2
    style={{
      color: "#e91e63",
      marginBottom: "15px"
    }}
  >
    🏆 Categoria Favorita
  </h2>

  <h3>
    {categoriaFavorita}
  </h3>
</div>

        {/* TOTAL GASTO */}
        <div
          style={{
            background: "#1f1f1f",
            padding: "30px",
            borderRadius: "20px"
          }}
        >
          <h2
            style={{
              color: "#4caf50",
              marginBottom: "15px"
            }}
          >
            💰 Total Gasto
          </h2>

          <h1>
            R$ {totalGasto.toFixed(2)}
          </h1>
        </div>

        {/* COMPRAS */}
        <div
          style={{
            background: "#1f1f1f",
            padding: "30px",
            borderRadius: "20px"
          }}
        >
          <h2
            style={{
              color: "#2196f3",
              marginBottom: "15px"
            }}
          >
            🛒 Compras
          </h2>

          <h1>
            {totalItens}
          </h1>
        </div>

        {/* MÉDIA */}
        <div
          style={{
            background: "#1f1f1f",
            padding: "30px",
            borderRadius: "20px"
          }}
        >
          <h2
            style={{
              color: "#ff9800",
              marginBottom: "15px"
            }}
          >
            📊 Média
          </h2>

          <h1>
            R$ {media.toFixed(2)}
          </h1>
        </div>

        {/* GASTO DO MÊS */}
        <div
          style={{
            background: "#1f1f1f",
            padding: "30px",
            borderRadius: "20px"
          }}
        >
          <h2
            style={{
              color: "#9c27b0",
              marginBottom: "15px"
            }}
          >
            📅 Gasto do Mês
          </h2>

          <h1>
            R$ {gastoMes.toFixed(2)}
          </h1>
        </div>

        {/* MAIS COMPRADO */}
        <div
          style={{
            background: "#1f1f1f",
            padding: "30px",
            borderRadius: "20px"
          }}
        >
          <h2
            style={{
              color: "#ff5722",
              marginBottom: "15px"
            }}
          >
            🥇 Mais Comprado
          </h2>

          <h3>
            {produtoMaisComprado}
          </h3>

          <p>
            📦 Total de produtos:
            {" "}
            <strong>
              {totalProdutos}
            </strong>
          </p>
        </div>

      </div>

      <GraficosGastosMes compras={compras} />
      <GraficosCategorias compras={compras} />
      <GraficosCompras compras={compras} />

      {/* BOTÕES */}
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

        <Link
          to="/compras"
          style={{
            background: "#2196f3",
            color: "#fff",
            padding: "15px 25px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          📋 Ver Compras
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;