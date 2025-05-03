import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "./init";

const booksRef = collection(firestore, "books");

export const addBook = async (book, userId) => {
  await addDoc(booksRef, {
    ...book,
    userId,
    createdAt: new Date(),
  });
};

export const getAllBooks = async () => {
  const snapshot = await getDocs(booksRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getUserBooks = async (userId) => {
    const q = query(booksRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  export const getBookById = async (id) => {
    try {
      const ref = doc(firestore, "books", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() };
      } else {
        console.warn("Książka o podanym ID nie istnieje:", id);
        return null;
      }
    } catch (error) {
      console.error("Błąd przy getBookById:", error);
      return null;
    }
  };
  
  // zaktualizuj książkę
  export const updateBook = async (id, data) => {
    const ref = doc(firestore, "books", id);
    await updateDoc(ref, data);
  };

export const deleteBook = async (bookId) => {
    const ref = doc(firestore, "books", bookId);
    await deleteDoc(ref);
  };

  