import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";

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
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px"
      }}
    >

      <h1>
        🔐 Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) =>
          setSenha(
            e.target.value
          )
        }
      />

      <button
        onClick={entrar}
      >
        Entrar
      </button>

    </div>

  );

}

export default Login;