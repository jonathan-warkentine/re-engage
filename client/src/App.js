import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import apolloClient from './apolloClient';

import LandingPage from './pages/LandingPage';
import Bucket from './pages/Bucket';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';


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
    <ApolloProvider client={apolloClient}>
      <NextUIProvider theme={darkTheme}>
        <Router>
            <Header />
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
            <Footer />
        </Router>
      </NextUIProvider>
    </ApolloProvider>
  );
}

export default App;
