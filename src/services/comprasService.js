import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const comprasRef = collection(db, "compras");

/* SALVAR OU ATUALIZAR COMPRA DO DIA */
export async function salvarCompra(compra) {

  await addDoc(
    comprasRef,
    compra
  );

}

/* LISTAR */
export async function listarCompras(uid) {

  const q = query(
    comprasRef,
    where(
      "uid",
      "==",
      uid
    )
  );

  const snapshot =
    await getDocs(q);

  const compras = snapshot.docs.map(
    (docItem) => ({
      id: docItem.id,
      ...docItem.data()
    })
  );

  /* MAIS RECENTES PRIMEIRO */
  return compras.sort((a, b) => {

    const [diaA, mesA, anoA] =
      a.data.split("/");

    const [diaB, mesB, anoB] =
      b.data.split("/");

    const dataA = new Date(
      anoA,
      mesA - 1,
      diaA
    );

    const dataB = new Date(
      anoB,
      mesB - 1,
      diaB
    );

    return dataB - dataA;

  });

}

/* EXCLUIR */
export async function excluirCompra(id) {

  const compraDoc =
    doc(db, "compras", id);

  await deleteDoc(compraDoc);

}

export async function buscarUltimoPreco(
  nomeProduto,
  uid
) {

    console.log("UID recebido:", uid);
    

  const q = query(
    comprasRef,
    where("uid", "==", uid)
  );

  const snapshot =
    await getDocs(q);

  let ultimoPreco = null;

  snapshot.docs.forEach((docItem) => {

    const compra =
      docItem.data();

    compra.itens?.forEach((item) => {

      if (
        item.nome.toLowerCase() ===
        nomeProduto.toLowerCase()
      ) {

        ultimoPreco = item.valor;

      }

    });

  });


  console.log(
  "Produto:",
  nomeProduto,
  "Último preço:",
  ultimoPreco
);

  return ultimoPreco;

}