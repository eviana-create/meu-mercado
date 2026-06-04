import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { salvarCompra, buscarUltimoPreco} from "../services/comprasService";

function NovaCompra() {

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const [carrinho, setCarrinho] = useState([]);

  const [historicoProdutos, setHistoricoProdutos] = useState([]);

  /* CARREGAR HISTÓRICO */
  useEffect(() => {

    const produtosSalvos = JSON.parse(
      localStorage.getItem(
        "historicoProdutos"
      )
    ) || [];

    setHistoricoProdutos(
      produtosSalvos
    );

  }, []);

  function definirCategoria(produto) {

  const nomeProduto =
    produto.toLowerCase();

  /* MERCEARIA */
  if (
    nomeProduto.includes("arroz") ||
    nomeProduto.includes("feij") ||
    nomeProduto.includes("macarr") ||
    nomeProduto.includes("farinha") ||
    nomeProduto.includes("açucar")
  ) {
    return "🛒 Mercearia";
  }

  /* BEBIDAS */
  if (
    nomeProduto.includes("coca") ||
    nomeProduto.includes("suco") ||
    nomeProduto.includes("agua") ||
    nomeProduto.includes("refrigerante")
  ) {
    return "🥤 Bebidas";
  }

  /* HORTIFRUTI */
  if (
    nomeProduto.includes("banana") ||
    nomeProduto.includes("maçã") ||
    nomeProduto.includes("batata") ||
    nomeProduto.includes("tomate")
  ) {
    return "🥬 Hortifruti";
  }

  /* LIMPEZA */
  if (
    nomeProduto.includes("detergente") ||
    nomeProduto.includes("sabão") ||
    nomeProduto.includes("amaciante")
  ) {
    return "🧼 Limpeza";
  }

  return "📦 Outros";

}

  /* ADICIONAR ITEM */
  async function adicionarItem() {

    if (!nome || !valor || !quantidade) {
      alert("Preencha todos os campos");
      return;
    }

    const ultimoPreco =
  await buscarUltimoPreco(nome);

if (
  ultimoPreco !== null &&
  Number(valor) !== Number(ultimoPreco)
) {

  const diferenca =
    Number(valor) -
    Number(ultimoPreco);

  if (diferenca > 0) {

    alert(
      `⚠️ Este produto aumentou R$ ${diferenca.toFixed(2)}`
    );

  } else {

    alert(
      `✅ Este produto ficou R$ ${Math.abs(diferenca).toFixed(2)} mais barato`
    );

  }

}

    const itemExistente = carrinho.find(
      (item) =>
        item.nome.toLowerCase() ===
        nome.toLowerCase()
    );

    if (itemExistente) {

      const novaLista = carrinho.map((item) => {

        if (
          item.nome.toLowerCase() ===
          nome.toLowerCase()
        ) {

          const novaQuantidade =
            item.quantidade + Number(quantidade);

          return {
            ...item,
            quantidade: novaQuantidade,
            subtotal:
              novaQuantidade * item.valor
          };

        }

        return item;

      });

      setCarrinho(novaLista);

    } else {

      const subtotal =
        Number(valor) * Number(quantidade);

      const novoItem = {
        nome,
        valor: Number(valor),
        quantidade: Number(quantidade),
        subtotal,
        categoria: definirCategoria(nome)
      };

      setCarrinho([
        ...carrinho,
        novoItem
      ]);

    }

    /* SALVAR HISTÓRICO */
    const produtosAtualizados = [
      ...new Set([
        ...historicoProdutos,
        nome
      ])
    ];

    setHistoricoProdutos(
      produtosAtualizados
    );

    localStorage.setItem(
      "historicoProdutos",
      JSON.stringify(produtosAtualizados)
    );

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

  /* EDITAR ITEM */
  function editarItem(index) {

    const item = carrinho[index];

    setNome(item.nome);
    setValor(item.valor);
    setQuantidade(item.quantidade);

    removerItem(index);

  }

  /* AUMENTAR */
  function aumentarQuantidade(index) {

    const novaLista = [...carrinho];

    novaLista[index].quantidade += 1;

    novaLista[index].subtotal =
      novaLista[index].quantidade *
      novaLista[index].valor;

    setCarrinho(novaLista);

  }

  /* DIMINUIR */
  function diminuirQuantidade(index) {

    const novaLista = [...carrinho];

    if (novaLista[index].quantidade > 1) {

      novaLista[index].quantidade -= 1;

      novaLista[index].subtotal =
        novaLista[index].quantidade *
        novaLista[index].valor;

      setCarrinho(novaLista);

    }

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

        {/* AUTOCOMPLETE */}
        {nome.length > 0 && (

          <div
            style={{
              background: "#1f1f1f",
              borderRadius: "10px",
              overflow: "hidden"
            }}
          >

            {historicoProdutos
              .filter((produto) =>
                produto
                  .toLowerCase()
                  .includes(
                    nome.toLowerCase()
                  )
              )
              .map((produto, index) => (

                <div
                  key={index}
                  onClick={() =>
                    setNome(produto)
                  }
                  style={{
                    padding: "12px",
                    cursor: "pointer",
                    borderBottom:
                      "1px solid #333"
                  }}
                >
                  🛒 {produto}
                </div>

              ))}

          </div>

        )}

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

            <p
              style={{
                color: "#ff9800",
                fontWeight: "bold"
              }}
            >
              {item.categoria}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px"
              }}
            >

              <button
                onClick={() =>
                  diminuirQuantidade(index)
                }
                style={{
                  background: "#f44336",
                  color: "#fff",
                  border: "none",
                  width: "35px",
                  height: "35px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "18px"
                }}
              >
                -
              </button>

              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold"
                }}
              >
                {item.quantidade}
              </span>

              <button
                onClick={() =>
                  aumentarQuantidade(index)
                }
                style={{
                  background: "#4caf50",
                  color: "#fff",
                  border: "none",
                  width: "35px",
                  height: "35px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "18px"
                }}
              >
                +
              </button>

            </div>

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

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px"
              }}
            >

              <button
                onClick={() =>
                  editarItem(index)
                }
                style={{
                  background: "#ff9800",
                  color: "#fff",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}
              >
                ✏️ Editar
              </button>

              <button
                onClick={() =>
                  removerItem(index)
                }
                style={{
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