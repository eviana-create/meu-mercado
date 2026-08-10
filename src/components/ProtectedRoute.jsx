import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
const { usuario, loading } = useAuth();

// Aguarda o Firebase verificar a sessão
if (loading) {
return null;
}

// Usuário não autenticado → envia para o login
if (!usuario) {
return <Navigate to="/login" replace />;
}

// Usuário autenticado → permite acesso
return children;
}

export default ProtectedRoute;
