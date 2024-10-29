import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
        name
        born
        id
        bookCount
    }
  }
`
export const ALL_BOOKS = gql`
query ($genre: String, $author: String) {
    allBooks (genre: $genre, author: $author) {
        title
        published
        author {
          name
          born
          bookCount
        }
        genres
    }
}
`

export const FIND_AUTHOR = gql`
  query findPersonByName($nameToSearch: String!) {
    findAuthor(name: $nameToSearch) {
        name
        born
        bookCount
    }
  }
`

export const FIND_BOOK = gql`
  query findBookByName($nameToSearch: String!) {
    findBook(title: $nameToSearch) {
        title
        published
        author
        genres
    }
  }
`

export const GET_USER_DATA = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`


export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
        title
        published
        author
        genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation changeAuthorBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

