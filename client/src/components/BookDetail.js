import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries'


function BookDetail(props) {
  const displayDetail = () => {
    const { data: { book } } = props
    if (book) {
      return (
        <Fragment>
          <div>
            Name:
            {book.name}
          </div>
          <div>
            Genre:
            {book.genre}
          </div>
          <div>
            Author:
            {book.author.name}
          </div>
          <p>Books by this author: </p>
          <ul>
            {book.author.books.map(item => <li key={item.id}>{item.name}</li>)}
          </ul>
        </Fragment>
      )
    }
    return null
  }

  return (
    <div>
      <h5>Book detail:</h5>
      {displayDetail()}
    </div>
  )
}

BookDetail.propTypes = {
  data: PropTypes.shape({}).isRequired,
}

export default graphql(
  getBookQuery,
  {
    options: props => ({
      variables: {
        id: props.bookId,
      },
    }),
  },
)(BookDetail)
