import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Content, Loading, Pagination as BasePagination, TimeTicker } from 'Components';
import { getUTCTime, formatTableData } from 'utils';

const TableContainer = styled.div`
  flex-basis: 100%;
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
`;
const TableMain = styled.table`
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  border-spacing: 0;
`;
const TableHead = styled.thead`
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.BORDER_PRIMARY};
  text-align: left;
`;
const HeadRow = styled.tr``;
const Row = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.BACKGROUND_LIGHT};
  }
`;
const TableBody = styled.tbody``;
const TableHeadData = styled.th`
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  padding: 10px 20px;
`;
const TableData = styled.td`
  padding: 10px 20px;
  text-align: left;
  border: none;
  min-width: 100px;
`;
const Pagination = styled(BasePagination)`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
`;
const LoadingContainer = styled.td``;

const Table = ({
  tableHeaders,
  tableData: rawTableData,
  resultsPerPage,
  currentPage,
  changePage,
  totalPages,
  isLoading,
  showIndex,
  title,
  showAge,
  size,
  noResults,
}) => {
  // Format the raw table data into the form we need it to be displayed
  const { pathname } = useLocation();
  const tableData = formatTableData(rawTableData, tableHeaders);
  const dataExists = tableData.length;
  const hasPagination = currentPage && changePage;
  const showPagination = dataExists && !isLoading && hasPagination && totalPages;
  // If showIndex is requested, determine the symbol for it
  const showIndexSymbol = typeof showIndex === 'string' ? showIndex : '#';
  const showIndexHeader = { displayName: showIndexSymbol, dataName: 'index' };
  // Add in index header if requested
  let finalTableHeaders = showIndex ? [showIndexHeader, ...tableHeaders] : tableHeaders;
  // Add in age header if requested
  const showAgeHeader = { displayName: 'Age', dataName: showAge };
  finalTableHeaders = showAge ? [...tableHeaders, showAgeHeader] : finalTableHeaders;

  const loaderRow = () => (
    <Row>
      <LoadingContainer colSpan="10">
        <Loading />
      </LoadingContainer>
    </Row>
  );

  const buildTableHead = () =>
    finalTableHeaders.map(({ displayName }) => <TableHeadData key={displayName}>{displayName}</TableHeadData>);

  const buildSingleRow = (rowData, index) =>
    finalTableHeaders.map(({ dataName, displayName }) => {
      // If it's just the index, we don't need to get any real value
      if (showIndex && dataName === 'index') {
        return <TableData key={displayName}>{index + 1 + (currentPage - 1) * resultsPerPage}</TableData>;
      }
      // If we want the age take the string key and render the timestamp
      if (showAge && displayName === 'Age') {
        // Pull the raw value since time will have a string of '+UTC' attached making it an invalid date
        const time = getUTCTime(rowData[dataName].raw);

        return (
          <TableData key={displayName}>
            <TimeTicker timestamp={time} text="" />
          </TableData>
        );
      }

      if (!rowData[dataName]) {
        console.warn(`Table Error! Data not found (rowData.${dataName}): `, { rowData, rawTableData: rawTableData[index], dataName });
      }

      const { link = false, value = '--', hover = false } = rowData[dataName] || {};
      // Note: if the value is an array, split all values out
      // Eg: value: [1456.43, 'vspn'] => {value[0]} {value[1]} (but use .map, since the array can vary in length)
      const finalValue = Array.isArray(value) ? value.map((singleValue) => singleValue) : value;
      const valueMissing = value === '--' || value === '' || value === '--';

      return (
        <TableData title={hover || value} key={displayName}>
          {link && !valueMissing && link !== pathname ? <Link to={link}>{finalValue}</Link> : value}
        </TableData>
      );
    });

  const buildAllRows = () => tableData.map((data, index) => <Row key={index}>{buildSingleRow(data, index)}</Row>);

  return (
    <Content size={size} title={title}>
      <TableContainer>
        <TableMain>
          <TableHead>
            <HeadRow>{buildTableHead()}</HeadRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              loaderRow()
            ) : dataExists ? (
              buildAllRows()
            ) : (
              <Row>
                <TableData colSpan="1000">{noResults}</TableData>
              </Row>
            )}
          </TableBody>
        </TableMain>
      </TableContainer>
      {showPagination ? (
        <Pagination
          numberOfItems={10}
          pageNumber={currentPage}
          secondary
          totalPages={totalPages}
          onChange={(page) => changePage(page)}
        />
      ) : null}
    </Content>
  );
};

Table.propTypes = {
  title: PropTypes.string,
  tableHeaders: PropTypes.array.isRequired,
  tableData: PropTypes.array,
  currentPage: PropTypes.number,
  changePage: PropTypes.func,
  totalPages: PropTypes.number,
  isLoading: PropTypes.bool,
  showIndex: PropTypes.any,
  showAge: PropTypes.string,
  size: PropTypes.string,
  noResults: PropTypes.string,
  resultsPerPage: PropTypes.number,
};
Table.defaultProps = {
  tableData: [],
  resultsPerPage: 0,
  currentPage: 0,
  changePage: null,
  totalPages: 0,
  isLoading: false,
  showIndex: false,
  title: '',
  size: '100%',
  showAge: '',
  noResults: 'No data available, refresh page to retry',
};

export default Table;
