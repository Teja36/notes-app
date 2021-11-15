import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy_g-KrVhWDVuJbz4T_d8aCi5X4k-oXm8",
  authDomain: "notes-app-ea30e.firebaseapp.com",
  projectId: "notes-app-ea30e",
  storageBucket: "notes-app-ea30e.appspot.com",
  messagingSenderId: "687397646190",
  appId: "1:687397646190:web:9c56362bfb11f6c71b9b7f",
};

const app = initializeApp(firebaseConfig);

export const addNotes = async (uid, title, desc) => {
  await addDoc(collection(db, "notes"), {
    userId: uid,
    title: title,
    description: desc,
    createdAt: serverTimestamp(),
  });
};

export const updateNote = async (id, title, desc) => {
  await updateDoc(doc(db, "notes", id), {
    title: title,
    description: desc,
    createdAt: serverTimestamp(),
  });
};

export const deleteNote = async (id) => {
  await deleteDoc(doc(db, "notes", id));
};

export const db = getFirestore(app);

export const auth = getAuth(app);
