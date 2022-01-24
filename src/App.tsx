import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';

import Navbar from './components/layout/navbar';
import Main from './components/layout/main';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';

const THEME: Theme = createTheme({
  typography: {
    "fontFamily": `"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif`
  },
  palette: {
    mode: 'dark',
  }
});

const App = () => {
  return (
    <ThemeProvider theme={THEME}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
