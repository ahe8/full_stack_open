import { useState, useEffect } from "react";
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { ALL_BOOKS, BOOK_ADDED, FIND_BOOKS_BY_GENRE, GET_USER_DATA, FIND_BOOKS_BY_FAVORITE_GENRE } from "./queries";


export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  switch(query.query) {
    case ALL_BOOKS:
      cache.updateQuery(query, ({ allBooks }) => {
        return {
          allBooks: uniqByTitle(allBooks.concat(addedBook)),
        }
      })
      break
    case FIND_BOOKS_BY_GENRE:
      cache.updateQuery(query, ({ findBooksWithGenre }) => {
        return {
          findBooksWithGenre: uniqByTitle(findBooksWithGenre.concat(addedBook)),
        }
      })
      break
    case FIND_BOOKS_BY_FAVORITE_GENRE:
      cache.updateQuery(query, ({ findBooksWithGenre }) => {
        return {
          findBooksWithGenre: uniqByTitle(findBooksWithGenre.concat(addedBook)),
        }
      })
      break
    default:
      return
  }
  // cache.updateQuery(query, ({ allBooks }) => {
  //   return {
  //     allBooks: uniqByTitle(allBooks.concat(addedBook)),
  //   }
  // })
}


const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [message, setMessage] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const [filteredGenre, setFilteredGenre] = useState('')

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      setMessage(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      updateCache(client.cache, { query: FIND_BOOKS_BY_GENRE, variables: { genre: filteredGenre } }, addedBook)
      updateCache(client.cache, { query: FIND_BOOKS_BY_FAVORITE_GENRE, variables: { genre: favoriteGenre } }, addedBook)
    }
  })

  useEffect(() => {
    setMessage('')
  }, [page])


  const results = useQuery(GET_USER_DATA)

  useEffect(() => {
    if (!results.loading && results.data.me) {
      setFavoriteGenre(results.data.me.favoriteGenre)
    }
  }, [results])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {token ?
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommend</button>
            <button onClick={logout}>logout</button>
          </> :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>


      <Notify message={message} />

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} filteredGenre={filteredGenre} setFilteredGenre={setFilteredGenre} />

      <NewBook show={page === "add"} setMessage={setMessage} filteredGenre={filteredGenre} favoriteGenre={favoriteGenre} />

      <Recommendations show={page === 'recommendations'} favoriteGenre={favoriteGenre} />

      <LoginForm show={page === "login"} setToken={setToken} setMessage={setMessage} setPage={setPage} />
    </div>
  );
};

export default App;
