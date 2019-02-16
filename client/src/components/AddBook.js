import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import { getAuthorsQuery, addBookMutation } from '../queries'

class AddBookForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { name, genre, authorId } = this.state
    const { addBook } = this.props

    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
    })
  }

  render() {
    const {
      getAuthorsQuery: {
        authors,
        loading,
      },
    } = this.props

    return (
      <form id="add-book" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>
            Book name:
            <input
              name="name"
              type="text"
              onChange={e => this.setState({ name: e.target.value })}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Genre:
            <input
              name="genre"
              type="text"
              onChange={e => this.setState({ genre: e.target.value })}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Author:
            <select
              name="author"
              onChange={e => this.setState({ authorId: e.target.value })}
            >
              { loading ? <option>Loading...</option>
                : (
                  <Fragment>
                    <option>Select author...</option>
                    {
                    authors.map(({ id, name }) => (
                      <option
                        name={name}
                        key={id}
                        value={id}
                      >
                        {name}
                      </option>
                    ))
                  }
                  </Fragment>
                )
              }
            </select>
          </label>
        </div>

        <button
          type="submit"
        >
          Submit
        </button>
      </form>
    )
  }
}

AddBookForm.propTypes = {
  getAuthorsQuery: PropTypes.shape({}).isRequired,
  addBook: PropTypes.func.isRequired,
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBook' }),
)(AddBookForm)
