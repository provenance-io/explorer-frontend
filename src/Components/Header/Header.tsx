import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { breakpoints } from '../../consts';
import CopyValue from '../CopyValue';

const HeaderContainer = styled.div`
  position: absolute;
  top: 110px;
  left: 0;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 14px 10%;
  background: ${({ theme }) => theme.BACKGROUND_HEADER};
  color: ${({ theme }) => theme.FONT_PRIMARY};
  box-shadow: 0 1px 10px 0 ${({ theme }) => theme.BOX_SHADOW};
  z-index: 100;

  @media ${breakpoints.down('lg')} {
    padding: 14px 4%;
    top: 110px;
  }
  @media ${breakpoints.down('md')} {
    padding: 10px;
    top: 52px;
  }
`;
const Title = styled.h2`
  && {
    margin: 0;
    padding: 0;
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  }
`;
const Line = styled.div`
  margin: 0 12px;
`;
const ValueContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Value = styled.div`
  user-select: none;
`;

interface HeaderProps {
  title: string;
  copyValue?: string;
  copyTitle?: string;
  value?: string | number;
  valueLink?: string;
  children?: any;
}

const Header = ({ title, copyValue, copyTitle, value, valueLink, children }: HeaderProps) => {
  const showLine = value || children;

  const renderValueContainer = () => (
    <ValueContainer>
      {valueLink ? (
        <Link to={valueLink}>
          <Value>{value}</Value>
        </Link>
      ) : (
        <Value>{value}</Value>
      )}
      {copyValue ? <CopyValue value={copyValue} title={copyTitle || copyValue} /> : null}
    </ValueContainer>
  );

  return (
    <HeaderContainer>
      <Helmet>
        <title>Provenance Blockchain Explorer - {title}</title>
      </Helmet>
      <Title data-testid="page-title">{title}</Title>
      {showLine && <Line>|</Line>}
      {children}
      {value ? renderValueContainer() : null}
    </HeaderContainer>
  );
};

export default Header;
