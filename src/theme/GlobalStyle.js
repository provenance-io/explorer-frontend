import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  html {
    font-size: 62.5%; /* =10px and will allow for all rem sizing to be easier, 1.4 rem => 14px*/
  }

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
    font-size: 2.8rem;
  }

  h2 {
    font-size: 2.0rem;
  }

  h3 {
    font-size: 1.8rem;
  }

  h4 {
    font-size: 1.6rem;
  }

  h5, h6 {
    font-size: 1.4rem;
  }

  p, span, li, footer {
    font-size: 1.4rem;
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
