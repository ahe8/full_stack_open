import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"


const Books = (props) => {
  const [genre, setGenre] = useState('')

  const results = useQuery(ALL_BOOKS, {
    variables: { genre }
  })

  const allResults = useQuery(ALL_BOOKS)
  

  if (!props.show || results.loading || allResults.loading) {
    return null
  }

  const allBooks = allResults.data.allBooks
  let books = results.data.allBooks

  let genres = []
  allBooks.forEach(book => {
    genres = genres.concat(book.genres)
  })
  let genreSet = new Set(genres)

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <b>{genre}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {[...genreSet].map((g) => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
