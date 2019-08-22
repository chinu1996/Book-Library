import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';



//Components that will be imported from the components folder

import BookList from './components/BookList'

//apollo client setup

const client = new ApolloClient ({
    uri: 'http:localhost/4000/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
      <div id="main">
          <h1>Books I have read</h1>

          <BookList />


      </div>
        </ApolloProvider>

    );
  }
}

export default App;
