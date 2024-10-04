import { Fragment, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  Content,
  Loading,
  Pagination as BasePagination,
  Sprite,
  TimeTicker,
  CopyValue,
  PercentBar,
} from '../../Components';
import OgBlockImage from '../../Components/BlockImage';
import { capitalize, getUTCTime, formatTableData, isEmpty } from '../../utils';
import { Skips } from '../../consts';

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
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => theme.BORDER_PRIMARY};
  text-align: left;
`;
const HeadRow = styled.tr``;
const Row = styled.tr`
  background-color: ${({ theme, index, isOpen }) =>
    isOpen
      ? index % 2 !== 0
        ? theme.BACKGROUND_LIGHT
        : ''
      : index % 2 !== 0
      ? theme.BACKGROUND_LIGHT
      : ''};
`;
const TableBody = styled.tbody``;
const TableHeadData = styled.th`
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  ${({ alignHeaderText }) => alignHeaderText && `text-align: ${alignHeaderText}`};
  padding: 10px 15px;
`;
const TableData = styled.td`
  padding: ${({ tablePadding }) => tablePadding || '10px 15px'};
  text-align: ${({ center }) => center};
  display: ${({ copy }) => (copy ? 'flex' : '')};
  align-items: ${({ copy }) => (copy ? 'center' : '')};
  border: none;
  text-decoration: ${({ skipped, scheduled }) => skipped && !scheduled && 'line-through'};
  font-style: ${({ skipped, scheduled }) => (skipped || scheduled) && 'italic'};
  color: ${({ color }) => color && color};
`;
const Pagination = styled(BasePagination)`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
`;
const LoadingContainer = styled.td``;
const Notes = styled.ul`
  font-size: 1.4rem;
  padding: 5px 0 10px 5px;
  list-style-type: '- ';
`;
const List = styled.li`
  font-size: 1.2rem;
  margin-left: 30px;
`;
const FlexContainer = styled.div`
  display: ${({ addImage }) => addImage && 'flex'};
  align-items: ${({ addImage }) => addImage && 'center'};
`;

const Table = ({
  changePage,
  className,
  tableBorder,
  currentPage,
  isLoading,
  ManageStakingBtn,
  noResults,
  notes,
  resultsPerPage,
  showAge,
  showIndex,
  size,
  tableData: rawTableData,
  tableHeaders,
  totalPages,
  title,
  headerContent,
  // isOpen,
  // setIsOpen,
  accordionData,
}) => {
  // Format the raw table data into the form we need it to be displayed
  const theme = useTheme();
  const { pathname } = useLocation();
  const tableData = formatTableData(rawTableData, tableHeaders);
  const [isOpen, setIsOpen] = useState(
    Object.fromEntries(tableData.map((item, index) => [index, false]))
  );
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

  // Notes lists
  const notesList = () => {
    switch (notes) {
      case 'skipped': {
        return Object.keys(Skips).map((version) => (
          <List key={version}>{`${version}:  ${Skips[version]}`}</List>
        ));
      }
      default:
        return null;
    }
  };

  const loaderRow = () => (
    <Row index={0}>
      <LoadingContainer colSpan="10">
        <Loading />
      </LoadingContainer>
    </Row>
  );

  const buildTableHead = () =>
    finalTableHeaders.map(({ displayName, alignHeaderText = '', headerIcon, blockImage }) => (
      <TableHeadData key={displayName} alignHeaderText={alignHeaderText}>
        <FlexContainer addImage={!isEmpty(blockImage) || !isEmpty(headerIcon)}>
          {!isEmpty(headerIcon) && <Sprite {...headerIcon} />}
          {!isEmpty(blockImage) && <OgBlockImage {...blockImage} />}
          {displayName}
        </FlexContainer>
      </TableHeadData>
    ));

  const buildSingleRow = (rowData, index) =>
    finalTableHeaders.map(
      ({ dataName, displayName, headerIcon = {}, blockImage: headerBlockImage = {} }) => {
        // If it's just the index, we don't need to get any real value
        if (showIndex && dataName === 'index') {
          return (
            <TableData key={displayName}>
              {index + 1 + (currentPage - 1) * resultsPerPage}
            </TableData>
          );
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

        if (dataName === 'manageStaking' || dataName === 'delegate') {
          return (
            <TableData key={displayName}>
              <ManageStakingBtn
                delegate={dataName === 'delegate'}
                validator={rawTableData[index]}
              />
            </TableData>
          );
        }

        // For voting data chart
        if (dataName === 'answer') {
          return (
            <TableData key={displayName} title={rowData[dataName].hover}>
              <PercentBar data={rowData[dataName].value} />
            </TableData>
          );
        }

        if (dataName === 'accordion') {
          return (
            <TableData key={dataName} title="View Data">
              <Sprite
                style={{ cursor: 'pointer' }}
                size="1.5rem"
                icon="CHEVRON"
                spin={isOpen[index] ? '90' : '-90'}
                onClick={() => setIsOpen({ [index]: !isOpen[index] })}
              />
            </TableData>
          );
        }

        if (!rowData[dataName]) {
          console.warn(`Table Error! Data not found (rowData.${dataName}): `, {
            rowData,
            rawTableData: rawTableData[index],
            dataName,
          });
        }

        const {
          link = false,
          externalLink = '',
          value = '--',
          hover = false,
          icon,
          spin,
          skipped = false,
          scheduled = false,
          iconColor = theme.FONT_LINK,
          color = '',
          size = '1.4rem',
          copy = false,
          blockImage = {},
          raw = '',
          addTextToLink = '',
        } = rowData[dataName] || {};

        // Note: if the value is an array, split all values out
        // Eg: value: [1456.43, 'vspn'] => {value[0]} {value[1]} (but use .map, since the array can vary in length)
        const finalValue = Array.isArray(value) ? value.map((singleValue) => singleValue) : value;
        const valueMissing = value === '--' || value === '' || value === '--';
        // If only displaying an icon, center it
        const center = icon && value === '' ? 'center' : 'left';

        return (
          <TableData
            title={hover || value}
            key={displayName}
            skipped={skipped && !scheduled}
            scheduled={scheduled}
            copy={
              copy ||
              (!isEmpty(blockImage) && (displayName === 'Moniker' || displayName === 'Proposer'))
            }
            center={center}
            color={color}
            // Adjusts padding if an icon is added in to the table
            tablePadding={(!isEmpty(headerIcon) || !isEmpty(headerBlockImage)) && '10px 50px'}
          >
            {blockImage && (displayName === 'Moniker' || displayName === 'Proposer') && (
              <OgBlockImage
                icon={blockImage.icon}
                moniker={blockImage.moniker}
                address={blockImage.address}
                sizeText={17}
                marginRight="10px"
                colorBackground={theme.IRIS_PRIMARY}
                colorFont={theme.FONT_WHITE}
                fontWeight={theme.FONT_WEIGHT_THIN}
              />
            )}
            {link && !valueMissing && link !== pathname ? (
              <>
                <Link to={link}>
                  {finalValue}
                  {icon && <Sprite icon={icon} size={size} color={iconColor} />}
                </Link>
                {addTextToLink && ` ${addTextToLink}`}
                {copy && <CopyValue value={raw} title={`Copy ${hover}`} />}
              </>
            ) : (
              <>
                {externalLink && (
                  <a href={externalLink} target="_blank" rel="noreferrer">
                    {value}
                  </a>
                )}
                {!externalLink && value}
                {addTextToLink && ` ${addTextToLink}`}
                {icon && <Sprite icon={icon} size={size} color={iconColor} spin={spin} />}
                {copy && <CopyValue value={raw} title={`Copy ${hover}`} />}
              </>
            )}
          </TableData>
        );
      }
    );

  const buildAllRows = () =>
    tableData.map((data, index) => (
      <Fragment key={index}>
        <Row key={index} index={index}>
          {buildSingleRow(data, index)}
        </Row>
        {isOpen[index] && accordionData.length > 0 && (
          <Row key={`subindex ${index}`} index={index}>
            <td colSpan={tableHeaders.length}>{accordionData[index]}</td>
          </Row>
        )}
      </Fragment>
    ));

  return (
    <Content
      className={className}
      size={size}
      title={title}
      headerContent={headerContent}
      contentBorder={tableBorder}
    >
      {notes && (
        <Notes>
          {`* ${capitalize(notes)}:`}
          {notesList()}
        </Notes>
      )}
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
              <Row index={0}>
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
  changePage: PropTypes.func,
  className: PropTypes.string,
  currentPage: PropTypes.number,
  isLoading: PropTypes.bool,
  ManageStakingBtn: PropTypes.func,
  noResults: PropTypes.string,
  notes: PropTypes.string,
  resultsPerPage: PropTypes.number,
  showIndex: PropTypes.any,
  showAge: PropTypes.string,
  size: PropTypes.string,
  tableData: PropTypes.array,
  tableHeaders: PropTypes.array.isRequired,
  totalPages: PropTypes.number,
  title: PropTypes.string,
  headerContent: PropTypes.element,
  tableBorder: PropTypes.bool,
  isOpen: PropTypes.object,
  setIsOpen: PropTypes.func,
  accordionData: PropTypes.array,
};
Table.defaultProps = {
  changePage: null,
  className: null,
  currentPage: 0,
  isLoading: false,
  ManageStakingBtn: null,
  noResults: 'No data available, refresh page to retry',
  notes: null,
  resultsPerPage: 0,
  showAge: '',
  showIndex: false,
  size: '100%',
  tableData: [],
  title: '',
  headerContent: null,
  totalPages: 0,
  tableBorder: true,
  isOpen: {},
  setIsOpen: null,
  accordionData: [],
};

export default Table;
