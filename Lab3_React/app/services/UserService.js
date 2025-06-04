import { auth, provider } from "./init";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Rejestracja użytkownika
export const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Logowanie użytkownika
export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Logowanie przez Google
export const loginWithGoogle = () => signInWithPopup(auth, provider);

// Wylogowanie
export const logout = () => signOut(auth);

// Nasłuchiwanie zmian stanu logowania
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);

// Eksport auth, jeśli potrzebny
export { auth };
