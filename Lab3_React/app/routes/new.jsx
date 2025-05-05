"use client"

import { useState } from "react";
import { useNavigate } from "react-router";
import { useBookstore } from "../Contexts/BookstoreContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/init";

export function meta() {
  return [
    { title: "Dodaj nową książkę - Księgarnia Między Kartkami" },
    { name: "description", content: "Formularz dodawania nowej książki do księgarni." },
  ]
}

export default function NewBook() {
  const navigate = useNavigate();
  const { user } = useBookstore(); // 🔑 Użytkownik zalogowany
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    year: "",
    cover: "",
    pages: "",
    genre: "",
    image: "/images/bookcover.jpg", // domyślna okładka
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Musisz być zalogowany, aby dodać książkę.");
      return;
    }

    const newBook = {
      title: formData.title,
      author: formData.author,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      year: parseInt(formData.year) || 0,
      cover: getCoverDisplayName(formData.cover),
      pages: parseInt(formData.pages) || 0,
      genre: getGenreDisplayName(formData.genre),
      image: formData.image,
      addedBy: user.uid,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "books"), newBook);
      navigate("/");
    } catch (error) {
      console.error("Błąd dodawania książki:", error);
      alert("Nie udało się dodać książki.");
    }
  };

  const handleCancel = () => {
    navigate("/")
  }

  // Helper function to convert cover value to display name
  const getCoverDisplayName = (coverValue) => {
    switch (coverValue) {
      case "audiobook":
        return "Audiobook"
      case "ebook":
        return "E-book"
      case "hard-cover":
        return "Twarda okładka"
      case "soft-cover":
        return "Miękka okładka"
      default:
        return coverValue
    }
  }

  // Helper function to convert genre value to display name
  const getGenreDisplayName = (genreValue) => {
    const genreMap = {
      klasyka: "Klasyka",
      kryminal: "Kryminał",
      fantastyka: "Fantastyka",
      romans: "Romans",
      thriller: "Thriller",
      horror: "Horror",
      biografia: "Biografia",
      naukowa: "Naukowa",
      historia: "Historia",
      psychologia: "Psychologia",
      filozofia: "Filozofia",
      "science-fiction": "Science Fiction",
      "literatura-dziecieca": "Literatura dziecięca",
      poezja: "Poezja",
      przygodowa: "Przygodowa",
      sensacyjna: "Sensacyjna",
      reportaz: "Reportaż",
      samorozwoj: "Samorozwój",
      religijna: "Religijna",
      podroznicza: "Podróżnicza",
    }

    return genreMap[genreValue] || genreValue
  }

  return (
    <div className="form-container">
      <h2>➜ Dodaj nową książkę</h2>
      <form onSubmit={handleSubmit}>
        {/* Tytuł książki */}
        <label htmlFor="title">Tytuł</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Wprowadź tytuł książki"
          required
          value={formData.title}
          onChange={handleChange}
        />

        {/* Autor książki */}
        <label htmlFor="author">Autor</label>
        <input
          type="text"
          id="author"
          name="author"
          placeholder="Wprowadź autora książki"
          required
          value={formData.author}
          onChange={handleChange}
        />

        {/* Opis książki */}
        <label htmlFor="description">Opis</label>
        <textarea
          id="description"
          name="description"
          placeholder="Wprowadź opis książki"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        {/* Cena i rok wydania */}
        <div className="form-group">
          <div>
            <label htmlFor="price">Cena (zł)</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="year">Rok wydania</label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Rok wydania"
              min="0"
              required
              value={formData.year}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Typ okładki i ilość stron */}
        <div className="form-group">
          <div>
            <label htmlFor="cover">Rodzaj</label>
            <select id="cover" name="cover" value={formData.cover} onChange={handleChange}>
              <option value="">Wybierz rodzaj</option>
              <option value="audiobook">Audiobooki</option>
              <option value="ebook">E-booki</option>
              <option value="hard-cover">Okładka twarda</option>
              <option value="soft-cover">Okładka miękka</option>
            </select>
          </div>
          <div>
            <label htmlFor="pages">Ilość stron</label>
            <input
              type="number"
              id="pages"
              name="pages"
              placeholder="Ilość stron"
              min="1"
              value={formData.pages}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Gatunek książki */}
        <label htmlFor="genre">Gatunek</label>
        <select id="genre" name="genre" value={formData.genre} onChange={handleChange}>
          <option value="">Wybierz gatunek</option>
          <option value="klasyka">Klasyka</option>
          <option value="kryminal">Kryminał</option>
          <option value="fantastyka">Fantastyka</option>
          <option value="romans">Romans</option>
          <option value="thriller">Thriller</option>
          <option value="horror">Horror</option>
          <option value="biografia">Biografia</option>
          <option value="naukowa">Naukowa</option>
          <option value="historia">Historia</option>
          <option value="psychologia">Psychologia</option>
          <option value="filozofia">Filozofia</option>
          <option value="science-fiction">Science Fiction</option>
          <option value="literatura-dziecieca">Literatura dziecięca</option>
          <option value="poezja">Poezja</option>
          <option value="przygodowa">Przygodowa</option>
          <option value="sensacyjna">Sensacyjna</option>
          <option value="reportaz">Reportaż</option>
          <option value="samorozwoj">Samorozwój</option>
          <option value="religijna">Religijna</option>
          <option value="podroznicza">Podróżnicza</option>
        </select>

        {/* Dodanie zdjęcia okładki */}
        <label htmlFor="cover-image">Zdjęcie okładki</label>
        <input type="file" id="cover-image" name="cover-image" />
        <p className="file-note">
          Uwaga: W tej wersji aplikacji przesyłanie plików jest wyłączone. Wszystkie nowe książki będą miały domyślną
          okładkę.
        </p>

        {/* Przyciski */}
        <div className="buttons">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Anuluj
          </button>
          <button type="submit" className="submit-btn">
            Dodaj książkę
          </button>
        </div>
      </form>
    </div>
  )
}