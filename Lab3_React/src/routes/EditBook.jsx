"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../Services/init";
import { updateBook, getBookById } from "../Services/BookService";

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true); // lepsze sterowanie
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log("useEffect odpalił się");
        console.log("ID z useParams:", id);
  
        const book = await getBookById(id);
        console.log("Typ getBookById:", typeof getBookById); // powinno być "function"
        console.log("Pobrana książka:", book);
  
        if (!book) {
          alert("Nie znaleziono książki.");
          return navigate("/");
        }
  
        if (auth.currentUser?.uid !== book.userId) {
          alert("Nie masz uprawnień do edycji tej książki.");
          return navigate("/");
        }
  
        setFormData(book);
      } catch (err) {
        console.error("Błąd przy pobieraniu książki:", err);
        alert("Wystąpił błąd.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
  
    fetchBook();
  }, [id, navigate]);
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = {
      ...formData,
      price: parseFloat(formData.price),
      year: parseInt(formData.year),
      pages: parseInt(formData.pages),
    };
    delete updated.id;
    await updateBook(id, updated);
    alert("Zaktualizowano książkę!");
    navigate("/");
  };

  const handleCancel = () => navigate("/");

  if (loading) return <p>Ładowanie danych książki...</p>;
  if (!formData) return <p>Nie udało się załadować danych książki.</p>;

  return (
    <div className="form-container">
      <h2>✏️ Edytuj książkę</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Tytuł</label>
        <input id="title" value={formData.title} onChange={handleChange} required />

        <label htmlFor="author">Autor</label>
        <input id="author" value={formData.author} onChange={handleChange} required />

        <label htmlFor="description">Opis</label>
        <textarea id="description" value={formData.description} onChange={handleChange}></textarea>

        <div className="form-group">
          <div>
            <label htmlFor="price">Cena (zł)</label>
            <input type="number" id="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="year">Rok wydania</label>
            <input type="number" id="year" value={formData.year} onChange={handleChange} required />
          </div>
        </div>

        <label htmlFor="cover">Rodzaj</label>
        <input id="cover" value={formData.cover} onChange={handleChange} />

        <label htmlFor="pages">Liczba stron</label>
        <input type="number" id="pages" value={formData.pages} onChange={handleChange} />

        <label htmlFor="genre">Gatunek</label>
        <input id="genre" value={formData.genre} onChange={handleChange} />

        <label htmlFor="image">Link do okładki</label>
        <input id="image" value={formData.image} onChange={handleChange} />

        <div className="buttons">
          <button type="button" onClick={handleCancel}>Anuluj</button>
          <button type="submit">Zapisz zmiany</button>
        </div>
      </form>
    </div>
  );
}
