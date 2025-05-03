import { useNavigate } from "react-router-dom";
import { auth } from "../Services/init";
import { deleteBook } from "../Services/BookService";
import { useBookstore } from "../Contexts/BookstoreContext";

export default function Book({ book }) {
  const navigate = useNavigate();
  const { setBooks } = useBookstore();
  const currentUser = auth.currentUser;

  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć tę książkę?");
    if (!confirmed) return;

    await deleteBook(book.id);
    setBooks(prev => prev.filter(b => b.id !== book.id));
  };

  const handleEdit = () => {
    navigate(`/edit/${book.id}`);
  };

  return (
    <div className="book">
      <img
        src={book.image || "/placeholder.svg"}
        className="book-image"
        alt={book.title}
      />
      <h3>{book.title}</h3>
      <p>{book.author}</p>

      <div className="book-details">
        <span className="tag">{book.cover}</span>
        <span className="tag">{book.genre}</span>
        <span className="tag">{book.year} rok</span>
      </div>

      <div className="book-description">
        <p>{truncateDescription(book.description || "Brak opisu")}</p>
      </div>

      <p className="book-price">{book.price.toFixed(2)} zł</p>
      <button className="add-to-cart">Dodaj do koszyka</button>

      {/* Tylko właściciel może edytować/usunąć */}
      {book.userId === currentUser?.uid && (
        <div className="book-actions">
          <button className="delete-btn" onClick={handleDelete}>
            Usuń
          </button>
          <button className="edit-btn" onClick={handleEdit}>
            Edytuj
          </button>
        </div>
      )}
    </div>
  );
}
