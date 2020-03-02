import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient, InMemoryCache, HttpLink, Observable, ApolloLink} from 'apollo-boost';
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom';
import LoginPage from './pages/login';
import {onError} from 'apollo-link-error';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={LoginPage} />
          <Route path='*' exact component={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include',
});
const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    }),
);

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorLink,
    requestLink,
    httpLink,
  ]),
});

export default App;
