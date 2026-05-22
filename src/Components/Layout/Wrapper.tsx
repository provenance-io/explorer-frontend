import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../consts';

const PageWrapper = styled.div<{ noHeader: boolean }>`
  padding: 156px 10%;
  position: relative;
  background-color: transparent;
  font-size: 0.875rem;
  @media ${breakpoints.down('lg')} {
    padding: ${({ noHeader }) => (noHeader ? '156px 4%' : '136px 4%')};
  }
  @media ${breakpoints.down('md')} {
    padding: ${({ noHeader }) => (noHeader ? '96px 4%' : '140px 4%')};
  }
`;

interface WrapperProps {
  children?: React.ReactNode | null;
  noHeader?: boolean;
}

const Wrapper = ({ children = null, noHeader = false }: WrapperProps) => (
  <PageWrapper noHeader={noHeader}>{children}</PageWrapper>
);

export default Wrapper;
