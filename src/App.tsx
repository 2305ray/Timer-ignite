import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './Components/styles/global';
import { defaultTheme } from './Components/styles/themes/default';
import { Router } from './Components/router';
import { BrowserRouter } from 'react-router-dom';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
}