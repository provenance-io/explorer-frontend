import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MultiTableContainer = styled.div`
  width: 100%;
`;
const TableLabelsContainer = styled.div`
  display: flex;
  flex-basis: 100%;
  margin-bottom: 10px;
  border-bottom: ${({ theme }) => `3px solid ${theme.FONT_SECONDARY}`};
`;
const TableLabel = styled.div`
  cursor: pointer;
  padding: 10px 20px;
  margin-bottom: -3px;
  color: ${({ theme }) => theme.FONT_SECONDARY};
  ${({ active, theme }) =>
    active &&
    `
    font-weight: ${theme.FONT_WEIGHT_NORMAL};
    color: ${theme.FONT_PRIMARY};
    border-bottom: 3px solid ${theme.FONT_PRIMARY};
  `}
  margin-right: 10px;
  user-select: none;
`;
const TablesContainer = styled.div`
  flex-basis: 100%;
`;
const TableChild = styled.div`
  flex-basis: 100%;
`;

const MultiTable = ({ className, children, active, setActive }) => {
  const [tableLabels, setTableLabels] = useState([]);

  // On component load, get all names of tables to render labels
  useEffect(() => {
    const allLabels = children.map(table => table.key);
    setTableLabels(allLabels);
  }, [children]);
  useEffect(() => {
    // Check if the activeIndex has been loaded, if it hasn't, load it, then add it to loadedIndexes
  });

  // When loading a new page of data or changing filters for a table, make sure to remove that table from loadedIndexes

  // Render each of the tables requested
  const renderTables = () =>
    children.map((childTable, index) =>
      index === active ? <TableChild key={index}>{childTable}</TableChild> : null
    );

  const renderLabels = () =>
    tableLabels.map((label, index) => (
      <TableLabel
        key={label}
        active={active === index}
        onClick={() => {
          setActive(index);
        }}
      >
        {label}
      </TableLabel>
    ));

  return (
    <MultiTableContainer className={className}>
      <TableLabelsContainer>{renderLabels()}</TableLabelsContainer>
      <TablesContainer>{renderTables()}</TablesContainer>
    </MultiTableContainer>
  );
};

MultiTable.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  active: PropTypes.number,
  setActive: PropTypes.func.isRequired,
};
MultiTable.defaultProps = {
  className: '',
  children: null,
  active: 0,
};

export default MultiTable;
