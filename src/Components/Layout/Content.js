import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as BaseLink } from 'react-router-dom';
import { Sprite as BaseSprite } from 'Components';

import { breakpoints } from 'consts';

const ContentWrapper = styled.div`
  max-width: 100%;
  position: relative;
  flex-basis: ${({ size }) => size};
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf};`};
  max-width: ${({ size }) => size};
`;
const ContentSpacer = styled.div`
  padding: 20px;
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  ${({ alignContent }) => alignContent && `align-content: ${alignContent};`};
  background: ${({ theme }) => theme.BACKGROUND_CONTENT};
  border: 1px solid ${({ theme }) => theme.BORDER_PRIMARY};
  flex-wrap: wrap;
  height: 100%;
  justify-content: ${({ justify }) => justify};
`;
const Header = styled.h3`
  && {
    display: flex;
    align-items: center;
    flex-basis: 100%;
    margin: 0 0 18px;
    @media ${breakpoints.between('sm', 'md')} {
      margin: 0 0 12px;
    }
  }
`;
const Sprite = styled(BaseSprite)`
  margin-right: 10px;
`;
const Title = styled.div`
  font-size: 1.6rem;
`;
const Link = styled(BaseLink)`
  justify-content: flex-end;
  margin-left: auto;
  color: ${({ theme }) => theme.FONT_LINK};
  :visited {
    color: ${({ theme }) => theme.FONT_LINK_VISITED};
  }
`;

const Content = ({
  children,
  size,
  justify,
  alignItems,
  title,
  icon,
  link,
  className,
  alignSelf,
  alignContent,
  headerContent,
}) => {
  const { to: linkTo, title: linkTitle } = link;
  const showHeader = title || icon || linkTo || linkTitle;

  const buildHeader = () => (
    <Header>
      {icon && <Sprite icon={icon} size="2rem" />}
      {title && <Title>{title}</Title>}
      {linkTo && linkTitle && <Link to={link.to}>{link.title}</Link>}
      {headerContent}
    </Header>
  );

  return (
    <ContentWrapper size={size} className={className} alignSelf={alignSelf}>
      <ContentSpacer justify={justify} alignItems={alignItems} alignContent={alignContent}>
        {showHeader && buildHeader()}
        {children}
      </ContentSpacer>
    </ContentWrapper>
  );
};

Content.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string,
  justify: PropTypes.string,
  alignItems: PropTypes.string,
  alignSelf: PropTypes.string,
  alignContent: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.object,
  className: PropTypes.string,
  headerContent: PropTypes.node,
};

Content.defaultProps = {
  className: null,
  children: null,
  size: '100%',
  justify: 'initial',
  alignItems: 'center',
  alignSelf: '',
  alignContent: 'flex-start',
  title: null,
  icon: null,
  link: {},
  headerContent: '',
};

export default Content;
