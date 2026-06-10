import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";

function Cadastro() {

  const navigate =
    useNavigate();

  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  async function cadastrar() {

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      alert(
        "Conta criada com sucesso!"
      );

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(error.message);

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
          padding: "40px",
          borderRadius: "25px"
        }}
      >

        <h1
          style={{
            color: "#fff",
            textAlign: "center"
          }}
        >
          📝 Criar Conta
        </h1>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
            borderRadius: "12px",
            border: "none"
          }}
        />

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
            marginTop: "15px",
            borderRadius: "12px",
            border: "none"
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
            marginTop: "15px",
            borderRadius: "12px",
            border: "none"
          }}
        />

        <button
          onClick={cadastrar}
          style={{
            width: "100%",
            marginTop: "20px",
            background: "#4caf50",
            color: "#fff",
            border: "none",
            padding: "15px",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Criar Conta
        </button>

        <Link
          to="/login"
          style={{
            textDecoration: "none"
          }}
        >
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
            Voltar para Login
          </button>
        </Link>

      </div>

    </div>

  );

}

export default Cadastro;