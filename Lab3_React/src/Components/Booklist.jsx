import { useEffect, useState } from "react";
import { useBookstore } from "../Contexts/BookstoreContext";
import Book from "./Book";
import { getAllBooks, getUserBooks } from "../Services/BookService";
import { auth } from "../Services/init";

export default function BookList() {
  const { setBooks, filteredBooks } = useBookstore();
  const [showMine, setShowMine] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const user = auth.currentUser;
      const data = showMine && user
        ? await getUserBooks(user.uid)
        : await getAllBooks();

      setBooks(data);
      setLoading(false);
    };

    fetchBooks();
  }, [showMine]);

  return (
    <main className="catalog">
      <h2>Katalog książek</h2>
      <p>Przeglądaj naszą kolekcję wyjątkowych białych kruków</p>

      {loading ? (
        <p>Ładowanie książek...</p>
      ) : filteredBooks.length > 0 ? (
        <div className="books">
          {filteredBooks.map(book => <Book key={book.id} book={book} />)}
        </div>
      ) : (
        <div className="no-results">
          <h3>Nie znaleziono książek</h3>
          <p>Spróbuj zmienić kryteria wyszukiwania</p>
        </div>
      )}
    </main>
  );
}
