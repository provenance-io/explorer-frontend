import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MultiTableContainer = styled.div``;
const MultiTable = ({ className, tableData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedIndexes, setLoadedIndexes] = useState([]);

  useEffect(() => {
    // Check if the activeIndex has been loaded, if it hasn't, load it, then add it to loadedIndexes
  });

  // When loading a new page of data or changing filters for a table, make sure to remove that table from loadedIndexes

  return <MultiTableContainer className={className}>MultiTable</MultiTableContainer>;
};

MultiTable.propTypes = {
  className: PropTypes.string,
};
MultiTable.defaultProps = {
  className: '',
};

export default MultiTable;
