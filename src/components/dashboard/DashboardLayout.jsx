function DashboardLayout({ children }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0f172a 0%, #111827 45%, #020617 100%)",
        color: "#fff",
        fontFamily:
          "Arial, Helvetica, sans-serif",
        padding: "30px 20px 60px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </main>
  );
}

export default DashboardLayout;