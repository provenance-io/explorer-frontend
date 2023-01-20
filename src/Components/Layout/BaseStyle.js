import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import Snow from 'let-it-snow';

const BaseStyling = styled.div`
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.BACKGROUND_LIGHT};
  font-family: ${({ theme }) => theme.PRIMARY_FONT};
  color: ${({ theme }) => theme.FONT_PRIMARY};
  a {
    color: ${({ theme }) => theme.FONT_LINK};
    :visited {
      color: ${({ theme }) => theme.FONT_LINK_VISITED};
    }
  }
  h1,
  h2,
  h3 {
    font-family: ${({ theme }) => theme.HEADER_FONT};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT_THIN};
  }
  h4,
  h5,
  h6 {
    font-family: ${({ theme }) => theme.PRIMARY_FONT};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  }
  p,
  span,
  li,
  footer {
    font-family: ${({ theme }) => theme.PRIMARY_FONT};
  }
  th {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  }
`;

const BaseStyle = ({ children }) => (
  <BaseStyling data-testid="base-style">
    {/* <Snow /> */}
    {children}
  </BaseStyling>
);

BaseStyle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseStyle;
