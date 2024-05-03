import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCSCjuQZJliCCN21x1V7A_KShNcD3ijPTA",
  authDomain: "first-project-15a9b.firebaseapp.com",
  projectId: "first-project-15a9b",
  storageBucket: "first-project-15a9b.appspot.com",
  messagingSenderId: "823233462255",
  appId: "1:823233462255:web:d4247411415d6959c3801a",
  measurementId: "G-W2Z5VSZJMC"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app)