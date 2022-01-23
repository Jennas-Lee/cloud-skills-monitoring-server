import React, from 'react';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';

import Navbar from './navbar';

const THEME: Theme = createTheme({
  typography: {
    "fontFamily": `"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif`
  }
});

const App = () => {
  return (
    <ThemeProvider theme={THEME}>
      <Navbar/>
    </ThemeProvider>
  );
}

export default App;
