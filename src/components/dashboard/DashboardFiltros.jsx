function DashboardFiltros({
  periodo,
  setPeriodo,
  nomePeriodo,
}) {
  return (
    <section
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "18px",
        marginBottom: "25px",
      }}
    >
      <label
        htmlFor="periodo-dashboard"
        style={{
          display: "block",
          color: "#cbd5e1",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        📅 Filtrar período
      </label>

      <select
        id="periodo-dashboard"
        name="periodo"
        value={periodo}
        onChange={(e) =>
          setPeriodo(e.target.value)
        }
        style={{
          width: "100%",
          maxWidth: "320px",
          padding: "13px",
          borderRadius: "10px",
          border: "1px solid #334155",
          background: "#0f172a",
          color: "#fff",
          fontSize: "16px",
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

      <p
        style={{
          color: "#94a3b8",
          marginTop: "12px",
        }}
      >
        📊 Exibindo:{" "}
        <strong
          style={{
            color: "#fff",
          }}
        >
          {nomePeriodo[periodo]}
        </strong>
      </p>
    </section>
  );
}

export default DashboardFiltros;