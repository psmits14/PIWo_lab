export default function Book({ book }) {
  // Skraca opis, jeśli jest zbyt długi ( do 100 znaków)
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

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

      <div className="book-actions">
        <button className="delete-btn" onClick={() => alert("Usuń – placeholder")}>
          Usuń
        </button>
        <button className="edit-btn" onClick={() => alert("Edytuj – placeholder")}>
          Edytuj
        </button>
      </div>
    </div>
  )
}
