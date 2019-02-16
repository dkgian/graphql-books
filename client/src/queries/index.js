import { gql } from 'apollo-boost'

const getAuthorsQuery = gql`
  {
    authors{
        id
        name
    }
  }
`
const getBooksQuery = gql`
  {
    books{
      name
      genre
      id
    }
  }
`

const getBookQuery = gql`
  query($id: ID){
    book(id:$id){
      name
      genre
      author{
        name
        age
        books{
          name
        }
      }
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook( name: $name, genre: $genre, authorId: $authorId) {
      name,
      id,
    }
  }
`
export {
  getAuthorsQuery,
  getBookQuery,
  getBooksQuery,
  addBookMutation,
}
