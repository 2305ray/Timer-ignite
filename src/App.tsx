import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './Components/styles/global';
import { defaultTheme } from './Components/styles/themes/default';
import { Router } from './Components/router';

import { BrowserRouter } from 'react-router-dom';
import { CyclesContextProvider } from './Context/CyclesContext';

export function App() {

  
  return (
  <ThemeProvider theme={defaultTheme}> {/*são providers de contexto */}
     <BrowserRouter>  {/*são providers de contexto */}
     <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
      <GlobalStyle />
    </BrowserRouter>
  </ThemeProvider>
  )
}
