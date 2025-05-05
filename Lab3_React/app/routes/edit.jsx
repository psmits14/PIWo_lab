"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getBookById, updateBook } from "../services/BookService"
import { useBookstore } from "../Contexts/BookstoreContext"

export default function EditBook() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useBookstore()
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    const fetchBook = async () => {
      const book = await getBookById(id)
      setFormData(book)
    }
    fetchBook()
  }, [id])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user || user.uid !== formData.addedBy) {
      alert("Nie masz uprawnień do edycji tej książki.")
      return
    }

    await updateBook(id, formData)
    navigate("/")
  }

  if (!formData) return <p>Ładowanie danych książki...</p>

  return (
    <div className="form-container">
      <h2>✎ Edytuj książkę</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Tytuł</label>
        <input id="title" value={formData.title} onChange={handleChange} required />

        <label htmlFor="author">Autor</label>
        <input id="author" value={formData.author} onChange={handleChange} required />

        <label htmlFor="description">Opis</label>
        <textarea id="description" value={formData.description} onChange={handleChange}></textarea>

        <label htmlFor="price">Cena</label>
        <input id="price" type="number" value={formData.price} onChange={handleChange} />

        <label htmlFor="year">Rok</label>
        <input id="year" type="number" value={formData.year} onChange={handleChange} />

        <label htmlFor="pages">Strony</label>
        <input id="pages" type="number" value={formData.pages} onChange={handleChange} />

        <label htmlFor="cover">Rodzaj</label>
        <input id="cover" value={formData.cover} onChange={handleChange} />

        <label htmlFor="genre">Gatunek</label>
        <input id="genre" value={formData.genre} onChange={handleChange} />

        <div className="buttons">
          <button type="submit" className="submit-btn">Zapisz</button>
        </div>
      </form>
    </div>
  )
}
