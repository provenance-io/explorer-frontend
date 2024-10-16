import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SelectFolders, DatePicker, Button } from '../../Components';
import { TextInput } from './Components';

const FilterContainer = styled.div`
  margin-bottom: ${({ flush }) => (flush ? '0' : '20px')};
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  position: relative;
`;
const FilterItem = styled.div`
  margin-bottom: 10px;
  min-width: ${({ minWidth }) => minWidth && minWidth};
  margin-right: 10px;
  align-items: center;
  input {
    color: ${({ theme }) => theme.INPUT_FONT_LIGHT};
    cursor: pointer;
  }
  &:last-of-type {
    margin-right: 0;
  }
`;
const FilterTitle = styled.div`
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  margin-bottom: 4px;
`;

const Filters = ({ filterData, mustApply, flush }) => {
  const buildFilterItems = () =>
    filterData.map((filterItem) => {
      const {
        type,
        title,
        options,
        action,
        maxHeight,
        setDefaults,
        list,
        value,
        minWidth,
        min,
        max,
      } = filterItem;
      const buildFilterType = () => {
        switch (type) {
          case 'dropdown':
            return (
              <SelectFolders
                allOptions={options}
                action={action}
                maxHeight={maxHeight}
                setDefaults={setDefaults}
              />
            );
          case 'datepicker':
            return <DatePicker {...options} />;
          case 'text':
            return <TextInput title={title} action={action} list={list} value={value} />;
          case 'number':
            return (
              <TextInput
                title={title}
                action={action}
                list={list}
                value={value}
                type="number"
                min={min}
                max={max}
              />
            );
          default:
            return '';
        }
      };

      return (
        <FilterItem key={title} minWidth={minWidth}>
          <FilterTitle>{title}</FilterTitle>
          {buildFilterType()}
        </FilterItem>
      );
    });

  return (
    <FilterContainer flush={flush}>
      {buildFilterItems()}
      {mustApply && (
        <FilterItem>
          <Button onClick={mustApply.action}>{mustApply.title}</Button>
        </FilterItem>
      )}
    </FilterContainer>
  );
};

Filters.propTypes = {
  flush: PropTypes.bool,
  mustApply: PropTypes.shape({
    title: PropTypes.string,
    action: PropTypes.func,
  }),
  filterData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      options: PropTypes.object,
      action: PropTypes.func,
      maxHeight: PropTypes.string,
      setDefaults: PropTypes.object,
    })
  ).isRequired,
};

Filters.defaultProps = {
  mustApply: null,
  flush: false,
};

export default Filters;
