import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService";
import { db } from "../firebase/firebaseConfig";

import GraficosGastosMes from "../components/GraficosGastosMes";
import GraficosCategorias from "../components/GraficosCategorias";
import GraficosCompras from "../components/GraficosCompras";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardFiltros from "../components/dashboard/DashboardFiltros";
import CardsResumo from "../components/dashboard/CardsResumo";
import MetaMensal from "../components/dashboard/MetaMensal";
import DashboardInsights from "../components/dashboard/DashboardInsights";
import DashboardActions from "../components/dashboard/DashboardActions";

function Dashboard() {
  const [compras, setCompras] = useState([]);
  const [periodo, setPeriodo] = useState("todos");
  const [metaMensal, setMetaMensal] = useState(1500);

  const navigate = useNavigate();
  const { usuario } = useAuth();

  const visitante = usuario?.isAnonymous;

  /*
   * CARREGAR COMPRAS
   */
  useEffect(() => {
    if (!usuario) return;

    const q = query(
      collection(db, "compras"),
      where("uid", "==", usuario.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const lista = snapshot.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));

        setCompras(lista);
      },
      (error) => {
        console.error(
          "Erro ao carregar compras:",
          error
        );
      }
    );

    return () => unsubscribe();
  }, [usuario]);

  /*
   * SAIR
   */
  async function sair() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao sair");
    }
  }

  /*
   * CONVERTER DATA
   */
  function converterData(dataString) {
    if (!dataString) return null;

    const partes = dataString.split("/");

    if (partes.length !== 3) return null;

    const [dia, mes, ano] = partes;

    return new Date(
      Number(ano),
      Number(mes) - 1,
      Number(dia)
    );
  }

  const hoje = new Date();

  /*
   * FILTRAR COMPRAS
   */
  const comprasFiltradas = useMemo(() => {
    return compras.filter((compra) => {
      const dataCompra = converterData(compra.data);

      if (!dataCompra) return false;

      switch (periodo) {
        case "hoje":
          return (
            dataCompra.toLocaleDateString("pt-BR") ===
            hoje.toLocaleDateString("pt-BR")
          );

        case "7dias": {
          const limite = new Date();
          limite.setDate(limite.getDate() - 7);
          return dataCompra >= limite;
        }

        case "30dias": {
          const limite = new Date();
          limite.setDate(limite.getDate() - 30);
          return dataCompra >= limite;
        }

        case "mes":
          return (
            dataCompra.getMonth() === hoje.getMonth() &&
            dataCompra.getFullYear() ===
              hoje.getFullYear()
          );

        case "ano":
          return (
            dataCompra.getFullYear() ===
            hoje.getFullYear()
          );

        default:
          return true;
      }
    });
  }, [compras, periodo]);

  /*
   * TOTAL GASTO
   */
  const totalGasto = comprasFiltradas.reduce(
    (total, compra) =>
      total + Number(compra.total || 0),
    0
  );

  /*
   * TOTAL DE COMPRAS
   */
  const totalItens = comprasFiltradas.length;

  /*
   * MÉDIA
   */
  const media =
    totalItens > 0
      ? totalGasto / totalItens
      : 0;

  /*
   * GASTO DO MÊS
   */
  const gastoMes = comprasFiltradas.reduce(
    (total, compra) => {
      const dataCompra =
        converterData(compra.data);

      if (!dataCompra) return total;

      if (
        dataCompra.getMonth() === hoje.getMonth() &&
        dataCompra.getFullYear() ===
          hoje.getFullYear()
      ) {
        return (
          total + Number(compra.total || 0)
        );
      }

      return total;
    },
    0
  );

  /*
   * META
   */
  const restanteMeta =
    metaMensal - gastoMes;

  /*
   * PRODUTOS
   */
  const contadorProdutos = {};

  comprasFiltradas.forEach((compra) => {
    compra.itens?.forEach((item) => {
      const nome =
        item.nome || "Sem nome";

      const quantidade =
        Number(item.quantidade || 1);

      contadorProdutos[nome] =
        (contadorProdutos[nome] || 0) +
        quantidade;
    });
  });

  const produtoMaisComprado =
    Object.keys(contadorProdutos).length
      ? Object.keys(contadorProdutos).reduce(
          (a, b) =>
            contadorProdutos[a] >
            contadorProdutos[b]
              ? a
              : b
        )
      : "Nenhum";

  const totalProdutos =
    Object.values(contadorProdutos).reduce(
      (total, quantidade) =>
        total + Number(quantidade || 0),
      0
    );

  /*
   * CATEGORIAS
   */
  const contadorCategorias = {};

  comprasFiltradas.forEach((compra) => {
    compra.itens?.forEach((item) => {
      const categoria =
        item.categoria || "Outros";

      contadorCategorias[categoria] =
        (contadorCategorias[categoria] || 0) +
        Number(item.quantidade || 1);
    });
  });

  const categoriaFavorita =
    Object.keys(contadorCategorias).length
      ? Object.keys(contadorCategorias).reduce(
          (a, b) =>
            contadorCategorias[a] >
            contadorCategorias[b]
              ? a
              : b
        )
      : "Nenhuma";

  /*
   * MAIOR COMPRA
   */
  const maiorCompra =
    comprasFiltradas.length
      ? comprasFiltradas.reduce(
          (maior, atual) =>
            Number(atual.total || 0) >
            Number(maior.total || 0)
              ? atual
              : maior
        )
      : null;

  /*
   * ÚLTIMA COMPRA
   */
  const ultimaCompra =
    comprasFiltradas.length
      ? [...comprasFiltradas].sort(
          (a, b) =>
            converterData(b.data) -
            converterData(a.data)
        )[0]
      : null;

  /*
   * PRODUTO MAIS CARO
   */
  let produtoMaisCaro = null;

  comprasFiltradas.forEach((compra) => {
    compra.itens?.forEach((item) => {
      if (
        !produtoMaisCaro ||
        Number(item.valor || 0) >
          Number(produtoMaisCaro.valor || 0)
      ) {
        produtoMaisCaro = item;
      }
    });
  });

  /*
   * ECONOMIA
   */
  let economiaTotal = 0;

  const historicoPrecos = {};

  comprasFiltradas.forEach((compra) => {
    compra.itens?.forEach((item) => {
      const nome = (
        item.nome || "produto"
      ).toLowerCase();

      const precoAtual =
        Number(item.valor || 0);

      if (
        historicoPrecos[nome] !== undefined
      ) {
        const precoAnterior =
          historicoPrecos[nome];

        if (precoAtual < precoAnterior) {
          economiaTotal +=
            (precoAnterior - precoAtual) *
            Number(item.quantidade || 1);
        }
      }

      historicoPrecos[nome] =
        precoAtual;
    });
  });

  /*
   * PERÍODOS
   */
  const nomePeriodo = {
    todos: "Todos",
    hoje: "Hoje",
    "7dias": "Últimos 7 dias",
    "30dias": "Últimos 30 dias",
    mes: "Este mês",
    ano: "Este ano",
  };

  /*
   * RENDER
   */
  return (
    <DashboardLayout>
      <DashboardHeader
        visitante={visitante}
      />

      <DashboardFiltros
        periodo={periodo}
        setPeriodo={setPeriodo}
        nomePeriodo={nomePeriodo}
      />

      <MetaMensal
        metaMensal={metaMensal}
        setMetaMensal={setMetaMensal}
        gastoMes={gastoMes}
        restanteMeta={restanteMeta}
      />

      <CardsResumo
        totalGasto={totalGasto}
        totalItens={totalItens}
        media={media}
        gastoMes={gastoMes}
      />

      <DashboardInsights
        produtoMaisComprado={
          produtoMaisComprado
        }
        totalProdutos={totalProdutos}
        categoriaFavorita={
          categoriaFavorita
        }
        maiorCompra={maiorCompra}
        produtoMaisCaro={produtoMaisCaro}
        ultimaCompra={ultimaCompra}
        economiaTotal={economiaTotal}
      />

      <section className="space-y-6 mb-8">
        <GraficosGastosMes
          compras={comprasFiltradas}
        />

        <GraficosCategorias
          compras={comprasFiltradas}
        />

        <GraficosCompras
          compras={comprasFiltradas}
        />
      </section>

      <DashboardActions />
    </DashboardLayout>
  );
}

export default Dashboard;