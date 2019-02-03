import React from "react"
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBooksQuery = gql`
  {
    books{
      name
      genre
      id
  }
}
`

function BookList({
  data: {
    loading,
    books,
  }
}) {
  console.log(loading)
  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
        {loading ?
          <div>Loading...</div>
        :
          books.map(({id, name, genre}) => {
            return(
              <li key={id}>
                {name} - {genre}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default graphql(getBooksQuery)(BookList)
