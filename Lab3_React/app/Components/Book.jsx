import { useBookstore } from "../Contexts/BookstoreContext";
import { deleteBook } from "../services/BookService";
import { useNavigate } from "react-router";
import InProgressContext from "../Contexts/inProgressContext";
import React, { useContext } from "react";

export default function Book({ book }) {
  const { user } = useBookstore();
  const navigate = useNavigate();
  const { dispatch } = useContext(InProgressContext);

  const handleDelete = async () => {
    if (!user || user.uid !== book.addedBy) {
      alert("Nie masz uprawnień do usunięcia tej książki.");
      return;
    }

    const confirm = window.confirm("Czy na pewno chcesz usunąć tę książkę?");
    if (!confirm) return;

    try {
      await deleteBook(book.id);
    } catch (err) {
      console.error("Błąd usuwania:", err);
      alert("Wystąpił błąd przy usuwaniu książki.");
    }
  };

  const handleEdit = () => {
    if (!user || user.uid !== book.addedBy) {
      alert("Nie masz uprawnień do edycji tej książki.");
      return;
    }

    navigate(`/edit/${book.id}`);
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleAddToInProgress = () => {
  dispatch({ type: "ADD_ITEM", payload: book });
  };

  return (
    <div className="book">
      <img src={book.image || "/placeholder.svg"} className="book-image" alt={book.title} />
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
      
      <button className="add-to-cart" onClick={handleAddToInProgress}>
      Dodaj do koszyka
      </button>


      {user?.uid === book.addedBy && (
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
