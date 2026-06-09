import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  login
} from "../services/authService";

import logoMeuMercado
  from "../assets/logo-meu-mercado.png";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  async function entrar() {

    try {

      await login(
        email,
        senha
      );

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        "Email ou senha inválidos"
      );

    }

  }

  return (

    <div
  style={{
    minHeight: "100vh",
    background: "#121212",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  }}
>

  <div
    style={{
      width: "100%",
      maxWidth: "500px",
      background: "#1f1f1f",
      borderRadius: "25px",
      overflow: "hidden",
      boxShadow:
        "0 0 30px rgba(0,0,0,0.4)"
    }}
  >

```
<div
  style={{
    background: "#0000",
    padding: "50px 30px",
    textAlign: "center",
    color: "#fff"
  }}
>

  <img
  src={logoMeuMercado}
  alt="Meu Mercado"
  style={{
    width: "220px",
    maxWidth: "100%",
    marginBottom: "20px"
  }}
/>

<p
  style={{
    marginTop: "10px",
    fontSize: "18px",
    opacity: 0.95
  }}
>
  Economize. Organize. Compare.
</p>

  <p
    style={{
      marginTop: "15px",
      fontSize: "18px",
      opacity: 0.95
    }}
  >
    Controle suas compras,
    acompanhe gastos e
    economize mais.
  </p>

</div>

<div
  style={{
    padding: "35px"
  }}
>

  <h2
    style={{
      color: "#fff",
      textAlign: "center",
      marginBottom: "25px"
    }}
  >
    🔐 Entrar
  </h2>

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
    style={{
      width: "100%",
      padding: "15px",
      borderRadius: "12px",
      border: "none",
      marginBottom: "15px"
    }}
  />

  <input
    type="password"
    placeholder="Senha"
    value={senha}
    onChange={(e) =>
      setSenha(e.target.value)
    }
    style={{
      width: "100%",
      padding: "15px",
      borderRadius: "12px",
      border: "none",
      marginBottom: "20px"
    }}
  />

  <button
    onClick={entrar}
    style={{
      width: "100%",
      background: "#4caf50",
      color: "#fff",
      border: "none",
      padding: "15px",
      borderRadius: "12px",
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    Entrar
  </button>

  <Link
    to="/cadastro"
  >
    <button
      style={{
        width: "100%",
        marginTop: "15px",
        background: "#ff9800",
        color: "#fff",
        border: "none",
        padding: "15px",
        borderRadius: "12px",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      📝 Criar Conta
    </button>
  </Link>

  <button
    style={{
      width: "100%",
      marginTop: "15px",
      background: "#2196f3",
      color: "#fff",
      border: "none",
      padding: "15px",
      borderRadius: "12px",
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    👤 Entrar como Visitante
  </button>

</div>
```

  </div>

</div>

  );

}

export default Login;