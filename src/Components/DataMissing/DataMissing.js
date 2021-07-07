import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DataRow = styled.div`
  display: flex;
  flex-basis: 100%;
  margin-bottom: 10px;
  word-break: ${({ nobreak }) => (nobreak ? 'normal' : 'break-all')};
  align-items: flex-start;
`;
const DataTitle = styled.div`
  min-width: ${({ size }) => size};
  color: ${({ color, theme }) => (color ? color : theme.FONT_TITLE_INFO)};
`;

const DataMissing = ({ children, color, nobreak, size }) => (
  <DataRow nobreak={nobreak}>
    <DataTitle color={color} size={size}>
      {children}
    </DataTitle>
  </DataRow>
);

DataMissing.propTypes = {
  children: PropTypes.any.isRequired,
  color: PropTypes.string,
  nobreak: PropTypes.bool,
  size: PropTypes.string,
};

DataMissing.defaultProps = {
  color: null,
  nobreak: false,
  size: '200px',
};

export default DataMissing;
