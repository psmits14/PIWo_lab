// app/Services/init.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAWCaYlO2gPG-GhodaTrIbJMK1tre9rfpo",
    authDomain: "ksiegarnia-272940.firebaseapp.com",
    projectId: "ksiegarnia-272940",
    storageBucket: "ksiegarnia-272940.firebasestorage.app",
    messagingSenderId: "83953953746",
    appId: "1:83953953746:web:301fc367015f473d6c760b"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
