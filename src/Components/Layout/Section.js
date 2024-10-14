import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints } from '../../consts';

const SectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  flex-basis: 100%;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
  ${({ header }) => header && 'margin-top: 50px;'}

  @media ${breakpoints.down('lg')} {
    ${({ header }) => header && 'margin-top: 60px;'}
  }

  @media ${breakpoints.down('md')} {
    ${({ header }) => header && 'margin-top: 0px;'}
  }

  @media ${breakpoints.up('sm')} {
    flex-direction: row;
  }
`;

const Section = ({ children, header }) => (
  <SectionWrapper header={header}>{children}</SectionWrapper>
);

Section.propTypes = {
  children: PropTypes.node,
  header: PropTypes.bool,
};

Section.defaultProps = {
  children: null,
  header: false,
};

export default Section;
