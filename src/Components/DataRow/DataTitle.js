import styled from 'styled-components';

export default styled.div`
  min-width: ${({ size }) => (size ? size : '200px')};
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
`;
