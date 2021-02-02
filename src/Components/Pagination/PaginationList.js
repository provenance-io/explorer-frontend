import styled from 'styled-components';

const PaginatorList = styled.ul.attrs(({ className = 'paginator-list' }) => ({ className }))`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  margin: 0;
  padding: 24px 0 0;
`;

export default PaginatorList;
