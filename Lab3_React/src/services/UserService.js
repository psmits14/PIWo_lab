// app/Services/UserService.js
import { auth } from "./init";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const login = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user; // możesz go zwrócić, np. do stanu w komponencie
  } catch (error) {
    console.error("Błąd logowania:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Błąd wylogowywania:", error);
  }
};
