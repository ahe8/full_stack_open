import { useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = (props) => {
  const results = useQuery(ALL_AUTHORS)
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      console.log('person not found')
    }
  }, [result.data])

  if (!props.show || results.loading) {
    return null
  }

  const authors = results.data.allAuthors


  const handleSubmit = (event) => {
    event.preventDefault()

    const name = event.target.authors.value
    const born = Number(event.target.born.value)

    editAuthor({ variables: { name, born } })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleSubmit}>
          <select name="authors">
            {authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>)}
          </select>
          <div>born<input name='born' type='number' /></div>
          <button>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
