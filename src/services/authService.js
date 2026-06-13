import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";
import {
  signInAnonymously
} from "firebase/auth";

export async function login(
  email,
  senha
) {

  return await signInWithEmailAndPassword(
    auth,
    email,
    senha
  );

}

export async function cadastrar(
  email,
  senha
) {

  return await createUserWithEmailAndPassword(
    auth,
    email,
    senha
  );

}

export async function logout() {

  return await signOut(auth);

}

export async function loginVisitante() {

  return await signInAnonymously(
    auth
  );

}