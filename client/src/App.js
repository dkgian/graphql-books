import React, { Component } from 'react'
import AppoloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import BookList from './components/BookList'
import AddBook from './components/AddBook'

const apolloClient = new AppoloClient({
  uri: 'http://localhost:3001/graphql',
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div className="container pt-1">
          <h4>Books list:</h4>
          <AddBook/>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
