function MetaMensal({
  metaMensal,
  setMetaMensal,
  gastoMes,
  restanteMeta,
}) {
  const percentual =
    metaMensal > 0
      ? Math.min(
          (gastoMes / metaMensal) * 100,
          100
        )
      : 0;

  const excedeu = restanteMeta < 0;

  return (
    <section
      style={{
        background:
          "linear-gradient(145deg, #1e293b, #0f172a)",
        border: "1px solid #334155",
        borderRadius: "22px",
        padding: "25px",
        marginBottom: "30px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "900",
            }}
          >
            🎯 Meta mensal
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "6px",
            }}
          >
            Acompanhe quanto você pretende gastar
            este mês.
          </p>
        </div>

        <div>
          <label
            htmlFor="meta-mensal"
            style={{
              display: "block",
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "6px",
            }}
          >
            Limite mensal
          </label>

          <input
            id="meta-mensal"
            name="metaMensal"
            type="number"
            min="0"
            value={metaMensal}
            onChange={(e) =>
              setMetaMensal(
                Number(e.target.value)
              )
            }
            style={{
              width: "180px",
              padding: "11px",
              borderRadius: "10px",
              border: "1px solid #475569",
              background: "#020617",
              color: "#fff",
              fontSize: "16px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "25px",
          height: "12px",
          background: "#020617",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentual}%`,
            height: "100%",
            borderRadius: "20px",
            background: excedeu
              ? "#ef4444"
              : "#22c55e",
            transition:
              "width .4s ease",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "15px",
          marginTop: "14px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ color: "#94a3b8" }}>
          Gasto:{" "}
          <strong style={{ color: "#fff" }}>
            R$ {gastoMes.toFixed(2)}
          </strong>
        </span>

        <span
          style={{
            color: excedeu
              ? "#f87171"
              : "#4ade80",
            fontWeight: "800",
          }}
        >
          {excedeu
            ? `Excedeu R$ ${Math.abs(
                restanteMeta
              ).toFixed(2)}`
            : `Restam R$ ${restanteMeta.toFixed(
                2
              )}`}
        </span>
      </div>
    </section>
  );
}

export default MetaMensal;