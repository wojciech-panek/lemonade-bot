import { createGlobalStyle } from 'styled-components';
import { fonts } from './styled';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: ${fonts.main};
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  html, body, #app {
    width: 100%;
    height: 100%;
  }
`;
