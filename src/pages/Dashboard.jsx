import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    (acc, item) => acc + item.valor,
    0
  );

  /* TOTAL DE ITENS */
  const totalItens = compras.length;

  /* MÉDIA */
  const media =
    totalItens > 0
      ? totalGasto / totalItens
      : 0;

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

        {/* TOTAL */}
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

          <h1
            style={{
              fontSize: "45px"
            }}
          >
            R$ {totalGasto.toFixed(2)}
          </h1>

        </div>

        {/* ITENS */}
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

          <h1
            style={{
              fontSize: "45px"
            }}
          >
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

          <h1
            style={{
              fontSize: "45px"
            }}
          >
            R$ {media.toFixed(2)}
          </h1>

        </div>

      </div>

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
            fontWeight: "bold",
            fontSize: "17px"
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
    fontWeight: "bold",
    fontSize: "17px"
  }}
>
  📋 Ver Compras
</Link>

      </div>

    </div>
  );
}

export default Dashboard;