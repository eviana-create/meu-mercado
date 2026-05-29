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
  function adicionarItem(e) {

    e.preventDefault();

    if (!nome || !valor) {
      alert("Preencha todos os campos");
      return;
    }

    const novoItem = {
      id: Date.now(),
      nome,
      valor: Number(valor),
      quantidade: Number(quantidade),
      subtotal: Number(valor) * Number(quantidade)
    };

    setCarrinho([...carrinho, novoItem]);

    setNome("");
    setValor("");
    setQuantidade(1);

  }

  /* REMOVER ITEM */
  function removerItem(id) {

    const novaLista = carrinho.filter(
      item => item.id !== id
    );

    setCarrinho(novaLista);

  }

  /* AUMENTAR */
  function aumentarQuantidade(id) {

    const novaLista = carrinho.map(item => {

      if (item.id === id) {

        const novaQtd = item.quantidade + 1;

        return {
          ...item,
          quantidade: novaQtd,
          subtotal: novaQtd * item.valor
        };

      }

      return item;

    });

    setCarrinho(novaLista);

  }

  /* DIMINUIR */
  function diminuirQuantidade(id) {

    const novaLista = carrinho.map(item => {

      if (
        item.id === id &&
        item.quantidade > 1
      ) {

        const novaQtd = item.quantidade - 1;

        return {
          ...item,
          quantidade: novaQtd,
          subtotal: novaQtd * item.valor
        };

      }

      return item;

    });

    setCarrinho(novaLista);

  }

  /* TOTAL */
  const total = carrinho.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );

  async function finalizarCompra() {

  if (carrinho.length === 0) {
    alert("Adicione itens");
    return;
  }

  try {

    const dataAtual = new Date();

    const compra = {

      data:
        dataAtual.toLocaleDateString("pt-BR"),

      total,

      itens: carrinho

    };

    await salvarCompra(compra);

    alert("Compra salva com sucesso!");

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
      <form
        onSubmit={adicionarItem}
        style={{
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "40px"
        }}
      >

        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
          style={{
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            fontSize: "16px"
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
            border: "none",
            fontSize: "16px"
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
            border: "none",
            fontSize: "16px"
          }}
        />

        <button
          type="submit"
          style={{
            background: "#2196f3",
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

      </form>

      {/* CARRINHO */}
      <div
        style={{
          display: "grid",
          gap: "20px"
        }}
      >

        {carrinho.map((item) => (

          <div
            key={item.id}
            style={{
              background: "#1f1f1f",
              padding: "20px",
              borderRadius: "18px"
            }}
          >

            <h2>
              🛒 {item.nome}
            </h2>

            <p>
              Quantidade: {item.quantidade}
            </p>

            <p
              style={{
                color: "#4caf50",
                fontSize: "22px",
                fontWeight: "bold"
              }}
            >
              R$ {item.subtotal.toFixed(2)}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "15px"
              }}
            >

              <button
                onClick={() =>
                  aumentarQuantidade(item.id)
                }
                style={{
                  background: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ➕
              </button>

              <button
                onClick={() =>
                  diminuirQuantidade(item.id)
                }
                style={{
                  background: "#ff9800",
                  color: "#fff",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ➖
              </button>

              <button
                onClick={() =>
                  removerItem(item.id)
                }
                style={{
                  background: "#f44336",
                  color: "#fff",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                🗑️ Remover
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* TOTAL */}
      <div
        style={{
          marginTop: "40px",
          background: "#1f1f1f",
          padding: "25px",
          borderRadius: "18px"
        }}
      >

        <h2
          style={{
            color: "#4caf50",
            fontSize: "35px"
          }}
        >
          TOTAL: R$ {total.toFixed(2)}
        </h2>

        <button
          onClick={finalizarCompra}
          style={{
            marginTop: "20px",
            background: "#4caf50",
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