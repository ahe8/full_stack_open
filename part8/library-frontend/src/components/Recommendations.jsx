import { useQuery } from "@apollo/client"
import { FIND_BOOKS_BY_FAVORITE_GENRE } from "../queries"

const Recommendations = ({ show, favoriteGenre }) => {
    const results = useQuery(FIND_BOOKS_BY_FAVORITE_GENRE, {
        variables: { genre: favoriteGenre }
    })

    if (!show || results.loading) {
        return null
    }

    const books = results.data.findBooksWithGenre
    
    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{favoriteGenre}</b></p>
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
        </div>
    )

}

export default Recommendations