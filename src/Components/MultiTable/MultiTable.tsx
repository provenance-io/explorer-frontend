import { useState, useEffect } from 'react';
import styled from 'styled-components';

const MultiTableContainer = styled.div`
  width: 100%;
`;
const TableLabelsContainer = styled.div`
  display: flex;
  flex-basis: 100%;
  margin-bottom: 10px;
  border-bottom: ${({ theme }) => `3px solid ${theme.FONT_SECONDARY}`};
`;
const TableLabel = styled.div<{ active?: boolean }>`
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

const Select = styled.select`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme[`BUTTON_PRIMARY_FONT`]};
  background: ${({ theme }) => theme[`BUTTON_PRIMARY`]};
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  &:focus {
    background: ${({ theme }) => theme[`BUTTON_PRIMARY_FOCUS`]};
    border-color: ${({ theme }) => theme[`BUTTON_PRIMARY_FOCUS`]};
  }
  &:hover {
    background: ${({ theme }) => theme[`BUTTON_PRIMARY_HOVER`]};
    border-color: ${({ theme }) => theme[`BUTTON_PRIMARY_FOCUS`]};
  }
  margin-bottom: 10px;
`;

interface MultiTableProps {
  className?: string;
  children: JSX.Element[];
  active: number;
  setActive: (arg: number) => void;
  isSmall?: boolean;
}

export const MultiTable = ({
  className = '',
  children,
  active,
  setActive,
  isSmall = false,
}: MultiTableProps) => {
  const [tableLabels, setTableLabels] = useState<React.Key[]>([]);

  // On component load, get all names of tables to render labels
  useEffect(() => {
    const allLabels = children.map((table) => table.key);
    setTableLabels(allLabels as unknown as React.Key[]);
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

  // If in a small view, handle when user selects a different table to view
  const handleChange = (e: React.ChangeEvent<any>) => {
    setActive(Number(e.target.value));
  };

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
      {!isSmall ? (
        <TableLabelsContainer>{renderLabels()}</TableLabelsContainer>
      ) : (
        <Select onChange={(e: any) => handleChange(e)}>
          {tableLabels.map((label, index) => (
            <option label={String(label)} key={index} value={index} />
          ))}
        </Select>
      )}
      <TablesContainer>{renderTables()}</TablesContainer>
    </MultiTableContainer>
  );
};
