import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Content, Loading, Pagination as BasePagination, TimeTicker } from 'Components';
import { getUTCTime } from 'utils';

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
  tableHeaders: tableHeadersObject,
  tableData,
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
  const tableHeaders = Object.keys(tableHeadersObject);
  const dataExists = tableData.length;
  const hasPagination = currentPage && changePage;
  const showPagination = dataExists && !isLoading && hasPagination && totalPages;
  // If showIndex is requested, determine the symbol for it
  const showIndexSymbol = typeof showIndex === 'string' ? showIndex : '#';
  let finalTableHeaders = showIndex ? [showIndexSymbol, ...tableHeaders] : tableHeaders;
  finalTableHeaders = showAge ? [...tableHeaders, 'Age'] : finalTableHeaders;

  const loaderRow = () => (
    <Row>
      <LoadingContainer colSpan="10">
        <Loading />
      </LoadingContainer>
    </Row>
  );

  const buildTableHead = () => finalTableHeaders.map((key) => <TableHeadData key={key}>{key}</TableHeadData>);

  const buildSingleRow = (rowData, index) =>
    finalTableHeaders.map((columnHeader) => {
      const columnData = tableHeadersObject[columnHeader];
      // If it's just the index, we don't need to get any real value\
      if (showIndex && columnData === showIndexSymbol) {
        return <TableData key={columnData}>{(index + 1) * currentPage}</TableData>;
      }
      // If we want the age take the string key and render the timestamp
      if (showAge && columnData === 'Age') {
        const time = getUTCTime(rowData[showAge].value);

        return (
          <TableData key={columnData}>
            <TimeTicker timestamp={time} text="" />
          </TableData>
        );
      }

      if (!rowData[columnData]) {
        console.error(`Critical Table Error! Data not found (rowData.${columnHeader}): `, { rowData, columnHeader });
      }

      const { link = false, value = '[N/A]', hover = false } = rowData[columnData.toLowerCase()] || {};
      // Note: if the value is an array, split all values out
      // Eg: value: [1456.43, 'vspn'] => {value[0]} {value[1]} (but use .map, since the array can vary in length)
      const finalValue = Array.isArray(value) ? value.map((singleValue) => singleValue) : value;
      const valueMissing = value === 'N/A' || value === '' || value === '[N/A]';

      return (
        <TableData title={hover || value} key={columnHeader}>
          {link && !valueMissing ? <Link to={link}>{finalValue}</Link> : value}
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
};
Table.defaultProps = {
  tableData: [],
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
