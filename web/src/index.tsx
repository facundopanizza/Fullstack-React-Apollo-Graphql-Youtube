import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache';
import { ApolloClient } from '@apollo/client/core/ApolloClient';
import { ApolloProvider } from '@apollo/client/react/context/ApolloProvider';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './tailwind.output.css';
import CreatePost from './CreatePost';
import EditPost from './EditPost';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/create-post">
            <CreatePost />
          </Route>
          <Route path="/edit/:id">
            <EditPost />
          </Route>
        </Switch>
      </React.StrictMode>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
