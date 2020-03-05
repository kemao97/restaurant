import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient, ApolloLink, InMemoryCache, Observable} from 'apollo-boost';
import {onError} from 'apollo-link-error';
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme';
import Routes from './Routes';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persist, store} from './redux/store';
import {CookiesProvider} from 'react-cookie';
import {createUploadLink} from 'apollo-upload-client';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <CookiesProvider>
            <PersistGate persistor={persist} loading={<div>hello world</div>}>
              <Routes />
            </PersistGate>
          </CookiesProvider>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

const cache = new InMemoryCache();
const httpLink = createUploadLink({
  uri: process.env.REACT_APP_API_URL,
  credentials: 'include',
});
const errorLink = onError(({
  operation,
  response,
  forward,
  graphQLErrors,
  networkError,
}) => {
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
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default App;
