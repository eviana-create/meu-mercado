function MetaMensal({
  metaMensal,
  setMetaMensal,
  gastoMes,
  restanteMeta,
}) {
  const meta = Number(metaMensal) || 0;
  const gasto = Number(gastoMes) || 0;
  const restante = Number(restanteMeta) || 0;

  const percentual =
    meta > 0 ? (gasto / meta) * 100 : 0;

  const percentualBarra = Math.min(
    percentual,
    100
  );

  const excedeu = restante < 0;

  const alerta =
    excedeu
      ? {
          cor: "#ef4444",
          fundo: "rgba(239,68,68,.10)",
          titulo: "Meta ultrapassada",
          mensagem:
            "Você ultrapassou o limite definido para este mês.",
        }
      : percentual >= 80
      ? {
          cor: "#f59e0b",
          fundo: "rgba(245,158,11,.10)",
          titulo: "Atenção aos gastos",
          mensagem:
            "Você já utilizou boa parte da sua meta mensal.",
        }
      : {
          cor: "#22c55e",
          fundo: "rgba(34,197,94,.10)",
          titulo: "Dentro da meta",
          mensagem:
            "Seus gastos estão dentro do limite planejado.",
        };

  return (
    <section
      style={{
        background:
          "linear-gradient(145deg, #1e293b, #0f172a)",
        border: "1px solid #334155",
        borderRadius: "22px",
        padding: "26px",
        marginBottom: "30px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,.20)",
      }}
    >
      {/* CABEÇALHO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                width: "42px",
                height: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
                background:
                  "rgba(34,197,94,.12)",
                fontSize: "21px",
              }}
            >
              🎯
            </span>

            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "900",
                  color: "#fff",
                }}
              >
                Meta mensal
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                Planeje seus gastos e evite
                ultrapassar seu limite.
              </p>
            </div>
          </div>
        </div>

        {/* INPUT DA META */}
        <div
          style={{
            width: "100%",
            maxWidth: "200px",
          }}
        >
          <label
            htmlFor="meta-mensal"
            style={{
              display: "block",
              color: "#94a3b8",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "7px",
            }}
          >
            Limite mensal
          </label>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#020617",
              border:
                "1px solid #475569",
              borderRadius: "11px",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                paddingLeft: "12px",
                color: "#64748b",
                fontWeight: "700",
              }}
            >
              R$
            </span>

            <input
              id="meta-mensal"
              name="metaMensal"
              type="number"
              min="0"
              step="50"
              value={metaMensal}
              onChange={(e) =>
                setMetaMensal(
                  Math.max(
                    0,
                    Number(e.target.value)
                  )
                )
              }
              style={{
                width: "100%",
                padding: "11px",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "800",
              }}
            />
          </div>
        </div>
      </div>

      {/* RESUMO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
          marginTop: "25px",
        }}
      >
        <div
          style={{
            background: "#020617",
            border:
              "1px solid #1e293b",
            borderRadius: "15px",
            padding: "16px",
          }}
        >
          <span
            style={{
              color: "#64748b",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            💸 Gasto atual
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "6px",
              fontSize: "23px",
              color: "#fff",
            }}
          >
            R$ {gasto.toFixed(2)}
          </strong>
        </div>

        <div
          style={{
            background: "#020617",
            border:
              "1px solid #1e293b",
            borderRadius: "15px",
            padding: "16px",
          }}
        >
          <span
            style={{
              color: "#64748b",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            🎯 Limite definido
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "6px",
              fontSize: "23px",
              color: "#fff",
            }}
          >
            R$ {meta.toFixed(2)}
          </strong>
        </div>

        <div
          style={{
            background: alerta.fundo,
            border:
              `1px solid ${alerta.cor}40`,
            borderRadius: "15px",
            padding: "16px",
          }}
        >
          <span
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            📊 Utilização
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "6px",
              fontSize: "23px",
              color: alerta.cor,
            }}
          >
            {percentual.toFixed(0)}%
          </strong>
        </div>
      </div>

      {/* BARRA */}
      <div
        style={{
          marginTop: "25px",
        }}
      >
        <div
          style={{
            height: "12px",
            background: "#020617",
            borderRadius: "20px",
            overflow: "hidden",
            border:
              "1px solid #1e293b",
          }}
        >
          <div
            style={{
              width: `${percentualBarra}%`,
              height: "100%",
              borderRadius: "20px",
              background: alerta.cor,
              transition:
                "width .5s ease",
              boxShadow:
                `0 0 15px ${alerta.cor}60`,
            }}
          />
        </div>
      </div>

      {/* STATUS */}
      <div
        style={{
          marginTop: "18px",
          padding: "15px 17px",
          borderRadius: "14px",
          background: alerta.fundo,
          border:
            `1px solid ${alerta.cor}30`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong
              style={{
                color: alerta.cor,
                fontSize: "15px",
              }}
            >
              {alerta.titulo}
            </strong>

            <p
              style={{
                margin: "4px 0 0",
                color: "#94a3b8",
                fontSize: "13px",
              }}
            >
              {alerta.mensagem}
            </p>
          </div>

          <strong
            style={{
              color: alerta.cor,
              fontSize: "17px",
            }}
          >
            {excedeu
              ? `- R$ ${Math.abs(
                  restante
                ).toFixed(2)}`
              : `R$ ${restante.toFixed(2)} restantes`}
          </strong>
        </div>
      </div>
    </section>
  );
}

export default MetaMensal;