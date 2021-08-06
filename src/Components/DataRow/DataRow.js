import styled from 'styled-components';
import { breakpoints } from 'consts';

export default styled.div`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  gap: 4px;
  margin: 10px 0;
  text-align: left;

  @media ${breakpoints.up('sm')} {
    flex-direction: row;
  }
`;
