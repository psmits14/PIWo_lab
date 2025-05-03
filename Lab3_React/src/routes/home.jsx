import Filters from "../Components/Filters"
import Booklist from "../Components/Booklist"

export function meta() {
  return [
    { title: "Księgarnia Między Kartkami" },
    { name: "description", content: "Przeglądaj i filtruj książki w naszej kolekcji." },
  ]
}

export default function Home() {
  return (
    <div className="container">
      <Filters />
      <Booklist />
    </div>
  )
}
