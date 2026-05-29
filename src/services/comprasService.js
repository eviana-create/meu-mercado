import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

const comprasRef = collection(db, "compras");

/* SALVAR COMPRA */
export async function salvarCompra(compra) {

  await addDoc(comprasRef, compra);

}

/* LISTAR */
export async function listarCompras() {

  const snapshot = await getDocs(comprasRef);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data()
  }));

}

/* EXCLUIR */
export async function excluirCompra(id) {

  const compraDoc = doc(db, "compras", id);

  await deleteDoc(compraDoc);

}