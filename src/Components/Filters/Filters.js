import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SelectFolders, DatePicker } from 'Components';

const FilterContainer = styled.div`
  margin-bottom: ${({ flush }) => (flush ? '0' : '20px')};
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  position: relative;
`;
const FilterItem = styled.div`
  margin-right: 10px;
  align-items: center;
  input {
    color: ${({ theme }) => theme.INPUT_FONT_LIGHT};
    cursor: pointer;
  }
`;
const FilterTitle = styled.div`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  margin-bottom: 4px;
`;
const FilterApplyBtn = styled.button`
  color: ${({ theme }) => theme.BUTTON_PRIMARY_FONT};
  background: ${({ theme }) => theme.BUTTON_PRIMARY};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.BUTTON_PRIMARY};
  padding: 6px 12px;
  cursor: pointer;
  &:focus {
    background: ${({ theme }) => theme.BUTTON_PRIMARY_FOCUS};
  }
  &:hover {
    background: ${({ theme }) => theme.BUTTON_PRIMARY_HOVER};
  }
  &:active {
    background: ${({ theme }) => theme.BUTTON_PRIMARY_ACTIVE};
    border: 1px solid ${({ theme }) => theme.BUTTON_PRIMARY_ACTIVE};
  }
`;

const Filters = ({ filterData, mustApply, flush }) => {
  const buildFilterItems = () =>
    filterData.map((filterItem) => {
      const { type, title, options, action } = filterItem;
      const buildFilterType = () => {
        switch (type) {
          case 'dropdown':
            return <SelectFolders allOptions={options} action={action} />;
          case 'datepicker':
            return <DatePicker {...options} />;
          default:
            return '';
        }
      };

      return (
        <FilterItem key={title}>
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
          <FilterApplyBtn onClick={mustApply.action}>{mustApply.title}</FilterApplyBtn>
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
    })
  ).isRequired,
};

Filters.defaultProps = {
  mustApply: null,
  flush: false,
};

export default Filters;
