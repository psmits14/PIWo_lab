import { useBookstore } from "../Contexts/BookstoreContext"
import Book from "./Book"

export default function BookList() {
  const { filteredBooks } = useBookstore()

  return (
    <main className="catalog">
      <h2>Katalog książek</h2>
      <p>Przeglądaj naszą kolekcję wyjątkowych białych kruków</p>

      <div className="books">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <Book key={book.id} book={book} />)
        ) : (
          <div className="no-results">
            <h3>Nie znaleziono książek</h3>
            <p>Spróbuj zmienić kryteria wyszukiwania</p>
          </div>
        )}
      </div>
    </main>
  )
}
