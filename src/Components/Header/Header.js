import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { breakpoints } from 'consts';

const HeaderContainer = styled.div`
  position: absolute;
  top: 66px;
  left: 0;
  display: flex;
  width: 100%;
  align-items: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  padding: 14px 220px;
  background: ${({ theme }) => theme.BACKGROUND_HEADER};
  color: ${({ theme }) => theme.FONT_PRIMARY};
  box-shadow: 0 1px 10px 0 ${({ theme }) => theme.BOX_SHADOW};
  z-index: 100;
  @media ${breakpoints.down('lg')} {
    padding: 14px 125px;
    top: 56px;
  }
  @media ${breakpoints.down('md')} {
    padding: 10px;
    top: 52px;
  }
`;
const Title = styled.div``;
const Line = styled.div`
  margin: 0 12px;
`;

const Header = ({ title, children }) => (
  <HeaderContainer>
    <Title>{title}</Title>
    {children && (
      <>
        <Line>|</Line>
        {children}
      </>
    )}
  </HeaderContainer>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
};

Header.defaultProps = {
  children: null,
};

export default Header;
