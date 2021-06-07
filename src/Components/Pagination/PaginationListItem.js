import styled from 'styled-components';

const PaginatorListItem = styled.li.attrs(({ className = 'paginator-list-item' }) => ({
  className,
}))`
  width: ${({ secondary }) => (secondary ? '19px' : '34px')};
  height: ${({ secondary }) => (secondary ? '19px' : '34px')};
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: ${({ secondary, active }) => (secondary ? (active ? '0 0 1px 0' : '0') : '2px')};
  border-style: solid;
  border-color: ${({ theme }) => theme.BORDER_THEME};
  background-color: ${({ secondary, theme, active }) =>
    !secondary && active ? theme.BACKGROUND_THEME : 'inherit'};
  > button {
    color: ${({ theme }) => theme.FONT_PRIMARY};
  }
  + li {
    margin: 0 3.5px;
  }
`;

export default PaginatorListItem;
