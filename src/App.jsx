import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NovaCompra from "./pages/NovaCompra";
import Compras from "./pages/Compras";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import HistoricoPrecos from "./pages/HistoricoPrecos";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/cadastro"
        element={<Cadastro />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/nova-compra"
        element={
          <ProtectedRoute>
            <NovaCompra />
          </ProtectedRoute>
        }
      />

      <Route
        path="/compras"
        element={
          <ProtectedRoute>
            <Compras />
          </ProtectedRoute>
        }
      />

      <Route
        path="/perfil"
        element={<Perfil />}
      />

      <Route
        path="/historico-precos"
        element={<HistoricoPrecos />}
      />

    </Routes>

  );

}

export default App;