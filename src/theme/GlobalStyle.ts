import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
 
  

  html, *, ::after, ::before {
    box-sizing: border-box;
  }

  body {
    font-size: 10px;
    letter-spacing: 0.045rem;
    height: 100%;
    min-height: 100vh;
    position:relative;
  }

  h1 {
    font-size: 1.75rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  h3 {
    font-size: 1.125rem;
  }

  h4 {
    font-size: 1rem;
  }

  h5, h6 {
    font-size: 0.875rem;
  }

  p, span, li, footer {
    font-size: 0.875rem;
    font-weight: 200;
    line-height: 1.75;
  }

  ul {
    padding-left: 20px;
  }

  a {
    text-decoration: none;
  }
`;
