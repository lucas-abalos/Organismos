// src/App.tsx
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './redux/store';
import MainPage from './pages/mainPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NoTAMSPage from './pages/noTAMSPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<Navigate to="/Organismos" replace />} />
            <Route path="/Organismos" element={<MainPage />} />
            {/* Ruta para la pantalla de NOTAMS */}
            <Route path="/notams" element={<NoTAMSPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
