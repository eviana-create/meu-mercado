import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { salvarCompra } from "../services/comprasService";

function NovaCompra() {

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const [carrinho, setCarrinho] = useState([]);

  /* ADICIONAR ITEM */
  function adicionarItem() {

    if (!nome || !valor || !quantidade) {
      alert("Preencha todos os campos");
      return;
    }

    const subtotal =
      Number(valor) * Number(quantidade);

    const novoItem = {
      nome,
      valor: Number(valor),
      quantidade: Number(quantidade),
      subtotal
    };

    setCarrinho([
      ...carrinho,
      novoItem
    ]);

    setNome("");
    setValor("");
    setQuantidade(1);

  }

  /* REMOVER ITEM */
  function removerItem(index) {

    const novaLista =
      carrinho.filter(
        (_, i) => i !== index
      );

    setCarrinho(novaLista);

  }

  /* TOTAL */
  const total = carrinho.reduce(
    (acc, item) =>
      acc + item.subtotal,
    0
  );

  /* FINALIZAR */
  async function finalizarCompra() {

    if (carrinho.length === 0) {
      alert("Adicione itens");
      return;
    }

    try {

      const dataAtual = new Date();

      await salvarCompra({

        data:
          dataAtual.toLocaleDateString("pt-BR"),

        total,

        itens: carrinho

      });

      alert("Compra salva!");

      navigate("/compras");

    } catch (error) {

      console.error(error);

      alert("Erro ao salvar");

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
          marginBottom: "30px"
        }}
      >
        🛒 Nova Compra
      </h1>

      {/* FORM */}
      <div
        style={{
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >

        <input
          type="text"
          placeholder="Produto"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
          style={{
            padding: "15px",
            borderRadius: "10px",
            border: "none"
          }}
        />

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) =>
            setValor(e.target.value)
          }
          style={{
            padding: "15px",
            borderRadius: "10px",
            border: "none"
          }}
        />

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) =>
            setQuantidade(e.target.value)
          }
          style={{
            padding: "15px",
            borderRadius: "10px",
            border: "none"
          }}
        />

        <button
          onClick={adicionarItem}
          style={{
            background: "#4caf50",
            color: "#fff",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ➕ Adicionar Item
        </button>

      </div>

      {/* LISTA */}
      <div
        style={{
          marginTop: "40px",
          display: "grid",
          gap: "20px"
        }}
      >

        {carrinho.map((item, index) => (

          <div
            key={index}
            style={{
              background: "#1f1f1f",
              padding: "20px",
              borderRadius: "15px"
            }}
          >

            <h2>
              🛒 {item.nome}
            </h2>

            <p>
              Quantidade:
              {" "}
              {item.quantidade}
            </p>

            <p>
              Valor:
              {" "}
              R$
              {" "}
              {item.valor.toFixed(2)}
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
              {item.subtotal.toFixed(2)}
            </p>

            <button
              onClick={() =>
                removerItem(index)
              }
              style={{
                marginTop: "10px",
                background: "#f44336",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              🗑️ Remover
            </button>

          </div>

        ))}

      </div>

      {/* TOTAL */}
      <div
        style={{
          marginTop: "40px",
          background: "#1f1f1f",
          padding: "25px",
          borderRadius: "20px"
        }}
      >

        <h1
          style={{
            color: "#4caf50"
          }}
        >
          💰 Total:
          {" "}
          R$
          {" "}
          {total.toFixed(2)}
        </h1>

        <button
          onClick={finalizarCompra}
          style={{
            marginTop: "20px",
            background: "#2196f3",
            color: "#fff",
            border: "none",
            padding: "15px 25px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          ✅ Finalizar Compra
        </button>

      </div>

    </div>
  );
}

export default NovaCompra;