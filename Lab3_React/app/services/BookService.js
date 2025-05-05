import { db } from "./init";
import { collection, addDoc, onSnapshot, serverTimestamp, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

// Referencja do kolekcji "books"
const booksCollection = collection(db, "books");

// Dodaj książkę
export const addBook = async (bookData) => {
  const bookWithMeta = {
    ...bookData,
    createdAt: serverTimestamp(),
  };
  return await addDoc(booksCollection, bookWithMeta);
};

// Nasłuchuj zmiany książek
export const subscribeToBooks = (callback) => {
  return onSnapshot(booksCollection, (snapshot) => {
    const books = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(books);
  });
};

// Usunięcie książki
export const deleteBook = async (bookId) => {
  const bookRef = doc(db, "books", bookId);
  await deleteDoc(bookRef);
};


// Pobieranie książki po ID
export async function getBookById(id) {
  const snap = await getDoc(doc(db, "books", id))
  if (snap.exists()) return { id: snap.id, ...snap.data() }
  throw new Error("Nie znaleziono książki")
}

// Aktualizacja książki
export async function updateBook(id, data) {
  return await updateDoc(doc(db, "books", id), data)
}