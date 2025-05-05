// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgTMG59IH90xBn8vFVMlOqmmnDVxhr_eM",
  authDomain: "miedzy-kartkami-272940.firebaseapp.com",
  projectId: "miedzy-kartkami-272940",
  storageBucket: "miedzy-kartkami-272940.firebasestorage.app",
  messagingSenderId: "601889960140",
  appId: "1:601889960140:web:bcbc1d382dc02870d6d269"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // <== TO MUSI BYĆ!
export const db = getFirestore(app);