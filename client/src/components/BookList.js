import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import BookDetail from './BookDetail'
import { getBooksQuery } from '../queries'

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
    }
  }

  render() {
    const {
      data: {
        loading,
        books,
      },
    } = this.props

    const { selected } = this.state

    return (
      <div>
        <ul id="book-list">
          {loading
            ? <div>Loading...</div>
            : books.map(({ id, name, genre }) => (
              <li
                key={id}
                onClick={() => { this.setState({ selected: id }) }}
              >
                {name}
                {' | '}
                {genre}
              </li>
            ))
          }
          <hr />
          <BookDetail bookId={selected} />
          <hr />
        </ul>
      </div>
    )
  }
}

BookList.propTypes = {
  data: PropTypes.shape({}).isRequired,
}

export default graphql(getBooksQuery)(BookList)
