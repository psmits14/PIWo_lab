"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Tworzenie kontekstu ze wstępnymi wartościami domyślnymi
const BookstoreContext = createContext({
  books: [],
  filteredBooks: [],
  filters: {
    genre: "",
    priceMin: "",
    priceMax: "",
    cover: "",
    pagesMin: "",
    pagesMax: "",
    yearMin: "",
    yearMax: "",
    author: "",
    description: "",
    sort: "price-asc",
  },
  setFilters: () => {},
  applyFilters: () => {},
  setBooks: () => {},
})

// Hook ułatwiający korzystanie z kontekstu
export const useBookstore = () => useContext(BookstoreContext)

export function BookstoreProvider({ children }) {
  // Lista książek
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Stary człowiek i morze",
      author: "Ernest Hemingway",
      year: 1952,
      price: 129.99,
      cover: "Twarda okładka",
      genre: "Klasyka",
      image: "/images/bookcover.jpg",
      pages: 127,
      description: "Opowieść o starym rybaku i jego walce z wielką rybą.",
    },
    {
      id: 2,
      title: "Zbrodnia i kara",
      author: "Fiodor Dostojewski",
      year: 1866,
      price: 149.99,
      cover: "Twarda okładka",
      genre: "Kryminał",
      image: "/images/bookcover.jpg",
      pages: 576,
      description: "Psychologiczna powieść o studencie, który popełnia morderstwo.",
    },
    {
      id: 3,
      title: "Duma i uprzedzenie",
      author: "Jane Austen",
      year: 1813,
      price: 89.99,
      cover: "Miękka okładka",
      genre: "Romans",
      image: "/images/bookcover.jpg",
      pages: 432,
      description: "Historia miłości i nieporozumień w angielskiej prowincji.",
    },
    {
      id: 4,
      title: "Władca Pierścieni",
      author: "J.R.R. Tolkien",
      year: 1954,
      price: 59.99,
      cover: "Twarda okładka",
      genre: "Fantastyka",
      image: "/images/bookcover.jpg",
      pages: 1178,
      description: "Epicka opowieść o walce dobra ze złem w Śródziemiu.",
    },
    {
      id: 5,
      title: "Morderstwo w Orient Expressie",
      author: "Agatha Christie",
      year: 1934,
      price: 99.99,
      cover: "Audiobook",
      genre: "Kryminał",
      image: "/images/bookcover.jpg",
      pages: 256,
      description: "Detektyw Hercule Poirot rozwiązuje zagadkę morderstwa w pociągu.",
    },
    {
      id: 6,
      title: "1984",
      author: "George Orwell",
      year: 1949,
      price: 109.99,
      cover: "Twarda okładka",
      genre: "Science Fiction",
      image: "/images/bookcover.jpg",
      pages: 328,
      description: "Dystopiczna wizja totalitarnego społeczeństwa przyszłości.",
    },
    {
      id: 7,
      title: "Harry Potter i Kamień Filozoficzny",
      author: "J.K. Rowling",
      year: 1997,
      price: 79.99,
      cover: "Miękka okładka",
      genre: "Fantastyka",
      image: "/images/bookcover.jpg",
      pages: 352,
      description: "Pierwszy rok Harry'ego Pottera w szkole magii i czarodziejstwa.",
    },
    {
      id: 8,
      title: "Mały Książę",
      author: "Antoine de Saint-Exupéry",
      year: 1943,
      price: 49.99,
      cover: "Miękka okładka",
      genre: "Literatura dziecięca",
      image: "/images/bookcover.jpg",
      pages: 96,
      description: "Filozoficzna opowieść o przyjaźni, miłości i życiu.",
    },
  ])

  // Filtry wyszukiwania
  const [filters, setFilters] = useState({
    genre: "",
    priceMin: "",
    priceMax: "",
    cover: "",
    pagesMin: "",
    pagesMax: "",
    yearMin: "",
    yearMax: "",
    author: "",
    description: "",
    sort: "price-asc",
  })

  // Lista książek po przefiltrowaniu
  const [filteredBooks, setFilteredBooks] = useState(books)

  // Funkcja nakładająca filtry na listę książek
  const applyFilters = () => {
    let result = [...books]

    // Filtruj po gatunku
    if (filters.genre) {
      result = result.filter((book) => book.genre === filters.genre)
    }

    // Filtruj po przedziale cenowym
    if (filters.priceMin) {
      result = result.filter((book) => book.price >= Number.parseFloat(filters.priceMin))
    }
    if (filters.priceMax) {
      result = result.filter((book) => book.price <= Number.parseFloat(filters.priceMax))
    }

    // Filtruj po rodzaju okładki
    if (filters.cover) {
      result = result.filter((book) =>
        book.cover.toLowerCase().includes(filters.cover.toLowerCase())
      )
    }

    // Filtruj po liczbie stron
    if (filters.pagesMin) {
      result = result.filter((book) => book.pages >= Number.parseInt(filters.pagesMin))
    }
    if (filters.pagesMax) {
      result = result.filter((book) => book.pages <= Number.parseInt(filters.pagesMax))
    }

    // Filtruj po roku wydania
    if (filters.yearMin) {
      result = result.filter((book) => book.year >= Number.parseInt(filters.yearMin))
    }
    if (filters.yearMax) {
      result = result.filter((book) => book.year <= Number.parseInt(filters.yearMax))
    }

    // Filtruj po autorze
    if (filters.author) {
      result = result.filter((book) =>
        book.author.toLowerCase().includes(filters.author.toLowerCase())
      )
    }

    // Filtruj po opisie
    if (filters.description) {
      result = result.filter((book) =>
        book.description.toLowerCase().includes(filters.description.toLowerCase())
      )
    }

    // Posortuj wyniki
    result = sortBooks(result, filters.sort)

    setFilteredBooks(result)
  }

  // Funkcja sortująca książki
  const sortBooks = (books, sortOption) => {
    const sortedBooks = [...books]

    switch (sortOption) {
      case "price-asc":
        return sortedBooks.sort((a, b) => a.price - b.price)
      case "price-desc":
        return sortedBooks.sort((a, b) => b.price - a.price)
      case "year-asc":
        return sortedBooks.sort((a, b) => a.year - b.year)
      case "year-desc":
        return sortedBooks.sort((a, b) => b.year - a.year)
      case "title-asc":
        return sortedBooks.sort((a, b) => a.title.localeCompare(b.title))
      case "title-desc":
        return sortedBooks.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return sortedBooks
    }
  }

  // Uruchamiaj filtrowanie po każdej zmianie książek
  useEffect(() => {
    applyFilters()
  }, [books]) // Tylko przy zmianie listy książek

  return (
    <BookstoreContext.Provider
      value={{
        books,
        setBooks,
        filters,
        setFilters,
        applyFilters,
        filteredBooks,
      }}
    >
      {children}
    </BookstoreContext.Provider>
  )
}
