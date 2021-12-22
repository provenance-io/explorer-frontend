import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints } from 'consts';

const PageWrapper = styled.div`
  padding: 106px 10%;
  position: relative;
  background-color: transparent;
  font-size: 1.4rem;
  @media ${breakpoints.down('lg')} {
    padding: ${({ noHeader }) => (noHeader ? '68px 10%' : '96px 10%')};
  }
  @media ${breakpoints.down('md')} {
    padding: ${({ noHeader }) => (noHeader ? '96px 4%' : '110px 4%')};
  }
`;

const Wrapper = ({ children, noHeader }) => (
  <PageWrapper data-testid="page-wrapper" noHeader={noHeader}>
    {children}
  </PageWrapper>
);

Wrapper.propTypes = {
  children: PropTypes.node,
  noHeader: PropTypes.bool,
};

Wrapper.defaultProps = {
  children: null,
  noHeader: false,
};

export default Wrapper;
