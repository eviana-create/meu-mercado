import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmJTT68X2kWhIqacrMAthVwGXOj9G9vvA",
  authDomain: "meu-mercado-7b6e6.firebaseapp.com",
  projectId: "meu-mercado-7b6e6",
  storageBucket: "meu-mercado-7b6e6.firebasestorage.app",
  messagingSenderId: "118889481624",
  appId: "1:118889481624:web:7172510b7c7903564697ed"
};

const app = initializeApp(firebaseConfig);

export const db =
  getFirestore(app);

export const auth =
  getAuth(app);