import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { getBooksQuery } from '../queries'

function BookList({
  data: {
    loading,
    books,
  },
}) {
  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
        {loading
          ? <div>Loading...</div>
          : books.map(({ id, name, genre }) => (
            <li key={id}>
              {name}
              {' '}
              {genre}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

BookList.propTypes = {
  data: PropTypes.shape({}).isRequired,
}

export default graphql(getBooksQuery)(BookList)
