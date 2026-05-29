import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NovaCompra from "./pages/NovaCompra";
import Compras from "./pages/Compras";

function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/nova-compra"
        element={<NovaCompra />}
      />

      <Route
        path="/compras"
        element={<Compras />}
      />

    </Routes>
  );
}

export default App;