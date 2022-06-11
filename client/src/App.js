import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, NextUIProvider } from '@nextui-org/react';

// import ModalProvider from './pages/ModalProvider';
import LandingPage from './pages/LandingPage';
import Bucket from './pages/Bucket';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  // 2. Call `createTheme` and pass your custom values
  const lightTheme = createTheme({
    type: 'light',
    /* theme: {
      colors: {},
    } */
  })

  const darkTheme = createTheme({
    type: 'dark',
    /* theme: {
      colors: {},
    } */
  })

  return (
    <ApolloProvider client={client}>
      <NextUIProvider theme={darkTheme}>
          <Router>
            <div >
              <Header />
              <div >
                <Routes>
                  <Route 
                    path="/" 
                    element={<LandingPage />}
                  />
                  <Route 
                    path="/bucket" 
                    element={<Bucket />}
                  />
                  <Route 
                    path="/login" 
                    element={<Login />}
                  />
                  <Route 
                    path="/signup" 
                    element={<Signup />}
                  />
                  <Route 
                    path="/dashboard" 
                    element={<Dashboard />}
                  />
                  <Route 
                    path="/game" 
                    element={<Game />}
                  />
                </Routes>
                {/* <ModalProvider /> */}
              </div>
              <Footer />
            </div>
          </Router>
      </NextUIProvider>
    </ApolloProvider>
  );
}

export default App;
