import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';
import montserratRegular from './Font/montserrat/regular.ttf';
import montserratMedium from './Font/montserrat/medium.ttf';
import montserratBold from './Font/montserrat/bold.ttf';

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: url(${montserratRegular}) format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    src: url(${montserratMedium}) format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    src: url(${montserratBold}) format('truetype');
    font-display: swap;
  }
 
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
