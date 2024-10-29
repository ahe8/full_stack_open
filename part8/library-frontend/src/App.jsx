import { useState, useEffect } from "react";
import { useApolloClient, useQuery } from '@apollo/client'

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { GET_USER_DATA } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [message, setMessage] = useState('')
  const [user, setUser] = useState({})

  const client = useApolloClient()

  useEffect(() => {
    setMessage('')
  },[page])

  const results = useQuery(GET_USER_DATA)
  
  useEffect(() => {
    if(!results.loading && results.data){
      setUser(results.data.me)
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

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page === 'recommendations'} user={user}/>

      <LoginForm show={page === "login"} setToken={setToken} setMessage={setMessage} setPage={setPage} />
    </div>
  );
};

export default App;
