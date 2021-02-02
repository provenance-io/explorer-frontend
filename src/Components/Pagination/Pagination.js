import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LinkButton from './LinkButton';
import PaginatorList from './PaginationList';
import PaginatorListItem from './PaginationListItem';
import Sprite from '../Sprite';

const NextPrevButton = styled(LinkButton)`
  display: flex;
  align-self: center;
`;

const Pagination = ({ className, pageNumber, totalPages, onChange, numberOfItems, secondary }) => {
  let maxPageNumber = totalPages - numberOfItems + 1;
  maxPageNumber = maxPageNumber < 1 ? 1 : maxPageNumber;
  let firstItemPageNumber = pageNumber - Math.floor(numberOfItems / 2);
  firstItemPageNumber = Math.min(Math.max(1, firstItemPageNumber), maxPageNumber);

  const handlePageNumber = (number) => {
    if (pageNumber === number) return;

    onChange(Math.min(Math.max(1, number), totalPages));
  };

  return (
    <PaginatorList className={className}>
      <PaginatorListItem secondary={secondary} active={false}>
        <NextPrevButton onClick={() => handlePageNumber(pageNumber - 1)}>
          <Sprite alt="Page left" color="ICON_PRIMARY" icon="BACK_ARROW" size="13px" />
        </NextPrevButton>
      </PaginatorListItem>

      {numberOfItems > 0 &&
        [...Array(Math.min(numberOfItems, totalPages))].map((_, i) => (
          <PaginatorListItem secondary={secondary} key={i + firstItemPageNumber} active={i + firstItemPageNumber === pageNumber}>
            <LinkButton onClick={() => handlePageNumber(firstItemPageNumber + i)}>{firstItemPageNumber + i}</LinkButton>
          </PaginatorListItem>
        ))}

      <PaginatorListItem secondary={secondary} active={false}>
        <NextPrevButton onClick={() => handlePageNumber(pageNumber + 1)}>
          <Sprite alt="Page right" flipX color="ICON_PRIMARY" icon="BACK_ARROW" size="13px" />
        </NextPrevButton>
      </PaginatorListItem>
    </PaginatorList>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  numberOfItems: PropTypes.number,
  secondary: PropTypes.bool,
};

Pagination.defaultProps = {
  className: null,
  numberOfItems: 3,
  secondary: false,
};

export default Pagination;
