"use client";

import { useState } from "react";
import { useBookstore } from "../Contexts/BookstoreContext";
import { auth } from "../Services/init";
import { getAllBooks, getUserBooks } from "../Services/BookService";

export default function Filters() {
  const { filters, setFilters, applyFilters, setBooks } = useBookstore();
  const [showMine, setShowMine] = useState(false);

  const toggleMine = async () => {
    const user = auth.currentUser;
    const books = showMine || !user
      ? await getAllBooks()
      : await getUserBooks(user.uid);

    setBooks(books);
    setShowMine(prev => !prev);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const filterKey = id.replace("-filter", "").replace("-min", "Min").replace("-max", "Max");

    setFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <aside className="filters">
      <h2>Filtry</h2>

      {/* Przycisk MOJE */}
      <button onClick={toggleMine} className="filter-toggle">
        {showMine ? "Wszystkie książki" : "MOJE"}
      </button>

      <form onSubmit={handleSubmit}>
        {/* Gatunek */}
        <label htmlFor="genre-filter">Gatunek</label>
        <select id="genre-filter" value={filters.genre} onChange={handleChange}>
          <option value="">Wszystkie</option>
          <option value="Klasyka">Klasyka</option>
          <option value="Kryminał">Kryminał</option>
          <option value="Fantastyka">Fantastyka</option>
          <option value="Romans">Romans</option>
          <option value="Thriller">Thriller</option>
          <option value="Horror">Horror</option>
          <option value="Biografia">Biografia</option>
          <option value="Naukowa">Naukowa</option>
          <option value="Historia">Historia</option>
          <option value="Psychologia">Psychologia</option>
          <option value="Filozofia">Filozofia</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Literatura dziecięca">Literatura dziecięca</option>
          <option value="Poezja">Poezja</option>
          <option value="Przygodowa">Przygodowa</option>
          <option value="Sensacyjna">Sensacyjna</option>
          <option value="Reportaż">Reportaż</option>
          <option value="Samorozwój">Samorozwój</option>
          <option value="Religijna">Religijna</option>
          <option value="Podróżnicza">Podróżnicza</option>
        </select>

        {/* Cena */}
        <label>Cena</label>
        <div className="price-filter">
          <input type="number" id="price-min" placeholder="Od" min="0" value={filters.priceMin} onChange={handleChange} />
          <input type="number" id="price-max" placeholder="Do" min="0" value={filters.priceMax} onChange={handleChange} />
        </div>

        {/* Rodzaj okładki */}
        <label htmlFor="cover-filter">Rodzaj</label>
        <select id="cover-filter" value={filters.cover} onChange={handleChange}>
          <option value="">Wszystkie</option>
          <option value="Audiobook">Audiobooki</option>
          <option value="E-book">E-booki</option>
          <option value="Twarda okładka">Okładka twarda</option>
          <option value="Miękka okładka">Okładka miękka</option>
        </select>

        {/* Liczba stron */}
        <label>Ilość stron</label>
        <div className="pages-filter">
          <input type="number" id="pages-min" placeholder="Od" min="1" step="1" value={filters.pagesMin} onChange={handleChange} />
          <input type="number" id="pages-max" placeholder="Do" min="1" step="1" value={filters.pagesMax} onChange={handleChange} />
        </div>

        {/* Rok wydania */}
        <label>Rok wydania</label>
        <div className="year-filter">
          <input type="number" id="year-min" placeholder="Od" min="0" value={filters.yearMin} onChange={handleChange} />
          <input type="number" id="year-max" placeholder="Do" min="0" value={filters.yearMax} onChange={handleChange} />
        </div>

        {/* Autor */}
        <label htmlFor="author-filter">Autor</label>
        <input type="text" id="author-filter" placeholder="Wpisz autora" value={filters.author} onChange={handleChange} />

        {/* Opis */}
        <label htmlFor="description-filter">Słowo w opisie</label>
        <input type="text" id="description-filter" placeholder="Wpisz słowo" value={filters.description} onChange={handleChange} />

        {/* Sortowanie */}
        <div className="filter-group">
          <label htmlFor="sort">Sortuj według:</label>
          <select id="sort" value={filters.sort} onChange={handleChange}>
            <option value="price-asc">Cena (rosnąco)</option>
            <option value="price-desc">Cena (malejąco)</option>
            <option value="year-asc">Rok wydania (rosnąco)</option>
            <option value="year-desc">Rok wydania (malejąco)</option>
            <option value="title-asc">Tytuł (A-Z)</option>
            <option value="title-desc">Tytuł (Z-A)</option>
          </select>
        </div>

        {/* Przycisk */}
        <button type="submit" className="filter-btn">
          Zastosuj filtry
        </button>
      </form>
    </aside>
  );
}
