import { useEffect, useState } from "react";

import {
  listarCompras,
  excluirCompra
} from "../services/comprasService";

function Compras() {

  const [compras, setCompras] = useState([]);

  useEffect(() => {

    carregarCompras();

  }, []);

  async function carregarCompras() {

    try {

      const lista = await listarCompras();

      setCompras(lista);

    } catch (error) {

      console.error(error);

    }

  }

  async function remover(id) {

    const confirmar = confirm(
      "Deseja excluir esta compra?"
    );

    if (!confirmar) return;

    try {

      await excluirCompra(id);

      carregarCompras();

    } catch (error) {

      console.error(error);

      alert("Erro ao excluir");

    }

  }

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

      <h1
        style={{
          fontSize: "45px",
          marginBottom: "15px"
        }}
      >
        📋 Histórico de Compras
      </h1>

      <p
        style={{
          color: "#ccc",
          marginBottom: "40px"
        }}
      >
        Visualize suas compras realizadas.
      </p>

      <div
        style={{
          display: "grid",
          gap: "25px"
        }}
      >

        {compras.map((compra) => (

          <div
            key={compra.id}
            style={{
              background: "#1f1f1f",
              padding: "25px",
              borderRadius: "18px"
            }}
          >

            <h2
              style={{
                marginBottom: "10px"
              }}
            >
              📅 {compra.data || "Sem data"}
            </h2>

            {/* ITENS */}
            {Array.isArray(compra.itens) ? (

              <div
                style={{
                  marginTop: "20px",
                  display: "grid",
                  gap: "15px"
                }}
              >

                {compra.itens.map((item, index) => (

                  <div
                    key={index}
                    style={{
                      background: "#2a2a2a",
                      padding: "15px",
                      borderRadius: "12px"
                    }}
                  >

                    <h3>
                      🛒 {item.nome}
                    </h3>

                    <p>
                      Quantidade:
                      {" "}
                      {item.quantidade}
                    </p>

                    <p>
                      Valor unitário:
                      {" "}
                      R$
                      {" "}
                      {Number(item.valor || 0).toFixed(2)}
                    </p>

                    <p
                      style={{
                        color: "#4caf50",
                        fontWeight: "bold"
                      }}
                    >
                      Subtotal:
                      {" "}
                      R$
                      {" "}
                      {Number(item.subtotal || 0).toFixed(2)}
                    </p>

                  </div>

                ))}

              </div>

            ) : (

              <div
                style={{
                  marginTop: "20px"
                }}
              >

                <h3>
                  🛒 {compra.nome}
                </h3>

                <p
                  style={{
                    color: "#4caf50",
                    fontWeight: "bold"
                  }}
                >
                  R$
                  {" "}
                  {Number(compra.valor || 0).toFixed(2)}
                </p>

              </div>

            )}

            <h2
              style={{
                marginTop: "25px",
                color: "#4caf50"
              }}
            >
              TOTAL:
              {" "}
              R$
              {" "}
              {Number(compra.total || compra.valor || 0).toFixed(2)}
            </h2>

            <button
              onClick={() =>
                remover(compra.id)
              }
              style={{
                marginTop: "20px",
                background: "#f44336",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              🗑️ Excluir Compra
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Compras;