import { useQuery } from "@apollo/client"
import { ALL_BOOKS, FIND_BOOKS_BY_GENRE } from "../queries"


const Books = ({show, filteredGenre, setFilteredGenre}) => {
  const results = useQuery(FIND_BOOKS_BY_GENRE, {
    variables: { genre: filteredGenre }
  })

  const allResults = useQuery(ALL_BOOKS)

  if (!show || results.loading || allResults.loading) {
    return null
  }

  const allBooks = allResults.data.allBooks
  let books = results.data.findBooksWithGenre

  let genres = []
  allBooks.forEach(book => {
    genres = genres.concat(book.genres)
  })
  let genreSet = new Set(genres)

  return (
    <div>
      <h2>books</h2>
      {filteredGenre && <p>in genre <b>{filteredGenre}</b></p>}
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

      {[...genreSet].map((g) => <button key={g} onClick={() => setFilteredGenre(g)}>{g}</button>)}
      <button onClick={() => setFilteredGenre('')}>all genres</button>
    </div>
  )
}

export default Books
