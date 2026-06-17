import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

import GraficosGastosMes from "../components/GraficosGastosMes";
import GraficosCategorias from "../components/GraficosCategorias";
import GraficosCompras from "../components/GraficosCompras";

import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

import { useAuth }
  from "../context/AuthContext";
  
import { db } from "../firebase/firebaseConfig";

function Dashboard() {

  const [compras, setCompras] = useState([]);
  const [periodo, setPeriodo] = useState("todos");
  const [metaMensal, setMetaMensal] = useState(1500);
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const visitante = usuario?.isAnonymous;

  useEffect(() => {

  if (!usuario) return;

  const q = query(
    collection(db, "compras"),
    where("uid", "==", usuario.uid)
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setCompras(lista);

    }
  );

  return () => unsubscribe();

}, [usuario]);

    async function sair() {

  try {

    await logout();

    navigate("/login");

  } catch (error) {

    console.error(error);

    alert("Erro ao sair");

  }

}

    function converterData(dataString) {

  const [dia, mes, ano] =
    dataString.split("/");

  return new Date(
    Number(ano),
    Number(mes) - 1,
    Number(dia)
  );

}

  const hojeData = new Date();

  const comprasFiltradas =
    compras.filter((compra) => {

    if (!compra.data)
      return false;

    const dataCompra =
      converterData(compra.data);

    switch (periodo) {

      case "hoje":

        return (
          dataCompra.toLocaleDateString(
            "pt-BR"
          ) ===
          hojeData.toLocaleDateString(
            "pt-BR"
          )
        );

      case "7dias": {

        const limite =
          new Date();

        limite.setDate(
          limite.getDate() - 7
        );

        return dataCompra >= limite;

      }

      case "30dias": {

        const limite =
          new Date();

        limite.setDate(
          limite.getDate() - 30
        );

        return dataCompra >= limite;

      }

      case "mes":

        return (
          dataCompra.getMonth() ===
            hojeData.getMonth() &&
          dataCompra.getFullYear() ===
            hojeData.getFullYear()
        );

      case "ano":

        return (
          dataCompra.getFullYear() ===
          hojeData.getFullYear()
        );

      default:

        return true;

    }

  });

  /* TOTAL GASTO */
  const totalGasto = comprasFiltradas.reduce(
    (acc, compra) =>
      acc + Number(compra.total || 0),
    0
  );

  /* TOTAL DE COMPRAS */
  const totalItens = comprasFiltradas.length;

  /* MÉDIA */
  const media =
    totalItens > 0
      ? totalGasto / totalItens
      : 0;

  /* MÊS ATUAL */
  const mesAtual = new Date().getMonth();
  const anoAtual = new Date().getFullYear();

  /* GASTO DO MÊS */
  const gastoMes = comprasFiltradas.reduce(
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

    const percentualMeta =
    metaMensal > 0
      ? (gastoMes / metaMensal) * 100
      : 0;

    const restanteMeta =
      metaMensal - gastoMes;

  /* CONTADOR DE PRODUTOS */
  const contadorProdutos = {};

  comprasFiltradas.forEach((compra) => {

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
  comprasFiltradas.length > 0
    ? comprasFiltradas.sort((a, b) => {

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

comprasFiltradas.forEach((compra) => {

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
  comprasFiltradas.length > 0
    ? comprasFiltradas.reduce((maior, atual) =>
        Number(atual.total || 0) >
        Number(maior.total || 0)
          ? atual
          : maior
      )
    : null;

/* PRODUTO MAIS CARO */

let produtoMaisCaro = null;

comprasFiltradas.forEach((compra) => {

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

comprasFiltradas.forEach((compra) => {

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

    const nomePeriodo = {
  todos: "Todos",
  hoje: "Hoje",
  "7dias": "Últimos 7 dias",
  "30dias": "Últimos 30 dias",
  mes: "Este mês",
  ano: "Este ano"
};

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

       <Link
            to="/perfil"
            style={{
              background: "#ff9800",
              color: "#fff",
              padding: "15px 25px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            👤 Perfil
          </Link><br></br>
        <br></br>
      
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

      {
  visitante && (

    <div
      style={{
        background: "#ff9800",
        color: "#fff",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "25px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}
    >

      <h3>
        👤 Modo Visitante
      </h3>

      <p>
        Você está utilizando o Meu Mercado sem cadastro.
        Seus dados podem ser perdidos caso troque de aparelho
        ou limpe o navegador.
      </p>

      <Link to="/cadastro">

        <button>
          🚀 Criar Conta Grátis
        </button>

      </Link>

    </div>

  )
}
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

      <div
  style={{
    marginTop: "20px"
  }}
>
  <label
    style={{
      display: "block",
      marginBottom: "10px",
      color: "#ccc"
    }}
  >
    📅 Filtrar período
  </label>

  <select
    value={periodo}
    onChange={(e) =>
      setPeriodo(e.target.value)
    }
    style={{
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      background: "#1f1f1f",
      color: "#fff",
      minWidth: "220px"
    }}
  >
    <option value="todos">
      Todos
    </option>

    <option value="hoje">
      Hoje
    </option>

    <option value="7dias">
      Últimos 7 dias
    </option>

    <option value="30dias">
      Últimos 30 dias
    </option>

    <option value="mes">
      Este mês
    </option>

    <option value="ano">
      Este ano
    </option>

  </select>
</div>

      <div
  style={{
    marginTop: "20px"
  }}
>
  <label
    style={{
      display: "block",
      marginBottom: "10px",
      color: "#ccc"
    }}
  >
    </label>

  {/* RESUMO DO FILTRO */}
  <div
    style={{
      marginTop: "15px",
      color: "#ccc",
      fontSize: "14px"
    }}
  >
    <p>
      📊 Exibindo: {comprasFiltradas.length} compras
    </p>

    <p>
      📅 Filtro: {nomePeriodo[periodo]}
    </p>
  </div>

</div><br></br>

      {/* CARDS */}

    <div
  style={{
    background: "#1f1f1f",
    padding: "30px",
    borderRadius: "20px"
  }}
>
  <h2
    style={{
      color: "#00e676",
      marginBottom: "15px"
    }}
  >
    🎯 Meta Mensal
  </h2>

  <input
  type="number"
  value={metaMensal}
  onChange={(e) =>
    setMetaMensal(
      Number(e.target.value)
    )
  }
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "none"
  }}
/>

  <p>
    Meta:
    {" "}
    R$ {metaMensal.toFixed(2)}
  </p>

  <p>
    Gasto:
    {" "}
    R$ {gastoMes.toFixed(2)}
  </p>

  <div
    style={{
      background: "#333",
      height: "15px",
      borderRadius: "10px",
      overflow: "hidden",
      marginTop: "10px"
    }}
  >
    <div
      style={{
        width: `${Math.min(
          percentualMeta,
          100
        )}%`,
        height: "100%",
        background:
          percentualMeta > 100
            ? "#f44336"
            : "#4caf50"
      }}
    />
  </div>

  <p
    style={{
      marginTop: "10px"
    }}
  >
    {percentualMeta.toFixed(0)}%
    utilizado
  </p>

  {restanteMeta >= 0 ? (
    <p>
      Restam
      {" "}
      R$ {restanteMeta.toFixed(2)}
    </p>
  ) : (
    <p
      style={{
        color: "#f44336"
      }}
    >
      Excedeu em
      {" "}
      R$
      {" "}
      {Math.abs(
        restanteMeta
      ).toFixed(2)}
    </p>
  )}
</div><br></br>

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

      <div
  style={{
    background: "#1f1f1f",
    padding: "25px",
    borderRadius: "18px",
    marginTop: "25px"
  }}
>

  <h2>
    📊 Estatísticas de Gastos
  </h2>

  <p
    style={{
      color: "#ccc"
    }}
  >
    Descubra quanto você gastou por mês,
    categorias mais compradas e evolução
    dos preços.
  </p>

  <button
    onClick={() => {

      if (usuario?.isAnonymous) {

        alert(
          "Crie uma conta gratuita para desbloquear as Estatísticas Avançadas."
        );

        return;

      }

      alert(
        "Em breve 🚀"
      );

    }}
    style={{
      background: "#673ab7",
      color: "#fff",
      border: "none",
      padding: "12px 20px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    {
      usuario?.isAnonymous
        ? "🔒 Recurso Premium"
        : "📊 Ver Estatísticas"
    }
  </button>

</div>

      <GraficosGastosMes compras={comprasFiltradas} />
      <GraficosCategorias compras={comprasFiltradas} />
      <GraficosCompras compras={comprasFiltradas} />

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

          <Link
            to="/historico-precos"
            style={{
              background: "#673ab7",
              color: "#fff",
              padding: "15px 25px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            📈 Histórico de Preços
          </Link>
      </div>

    </div>
  );
}

export default Dashboard;