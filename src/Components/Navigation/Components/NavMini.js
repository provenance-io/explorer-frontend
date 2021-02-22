import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as BaseLink, useLocation } from 'react-router-dom';
import { Links, Path } from 'consts';
// Direct import to prevent import order issues
import SearchBar from '../../SearchBar';
import Sprite from '../../Sprite';

const NavigationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: ${({ theme }) => theme.BACKGROUND_DARK};
`;

const LinkWrapper = styled.div`
  margin: 10px 0;
  padding-bottom: 5px;
  &:first-of-type {
    margin-top: 0;
  }
`;

const Link = styled(BaseLink)`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.FONT_NAV};
  opacity: 0.9;
  :hover {
    opacity: 1;
  }
  :visited {
    color: ${({ theme }) => theme.FONT_NAV_VISITED};
  }
  ${({ active, theme }) =>
    active &&
    `
      opacity: 1;
      font-weight: ${theme.FONT_WEIGHT_BOLDEST};
      text-decoration: underline solid ${theme.FONT_NAV} 2px;
      text-underline-offset: 3px;
  `}
`;

const LogoLink = styled(BaseLink)`
  display: flex;
  align-items: center;
`;
const DropdownContainer = styled.div`
  padding: 30px 5px 5px 5px;
  width: 100%;
  position: relative;
`;
const SearchContainer = styled.div`
  width: 100%;
  padding: 30px 10px 10px 0;
  position: relative;
`;
const SearchClose = styled(Sprite)`
  position: absolute;
  right: 0;
  top: 10px;
`;
const MenuIcon = styled(Sprite)`
  margin-right: 20px;
`;
const CloseIcon = styled(Sprite)`
  position: absolute;
  right: 0;
  top: 30px;
`;

const NavMini = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { pathname } = useLocation();

  const buildLinks = () =>
    Object.keys(Links).map((linkName) => {
      const { url, title } = Links[linkName];
      const active = pathname === url ? 'true' : undefined;
      return (
        <LinkWrapper>
          <Link key={url} to={url} active={active} onClick={() => setShowMenu(false)}>
            {title}
          </Link>
        </LinkWrapper>
      );
    });

  const toggleMenu = () => {
    showMenu ? setShowMenu(false) : openDropdown('menu');
  };
  const toggleSearch = () => {
    showSearch ? setShowSearch(false) : openDropdown('search');
  };
  const openDropdown = (type) => {
    if (type === 'menu') {
      setShowSearch(false);
      setShowMenu(true);
    } else {
      setShowSearch(true);
      setShowMenu(false);
    }
  };

  return (
    <NavigationWrapper>
      <MenuIcon icon="MENU" onClick={toggleMenu} size="3.0rem" color={showMenu ? 'ICON_PRIMARY' : 'ICON_WHITE'} />
      <LogoLink to={Path.HOME_URL} title="Provenance Explorer | Home">
        <Sprite icon="LOGO" height="32px" />
      </LogoLink>
      <Sprite icon="SEARCH" onClick={toggleSearch} size="2.0rem" color={showSearch ? 'ICON_PRIMARY' : 'ICON_WHITE'} />
      {showMenu && (
        <DropdownContainer>
          <CloseIcon
            icon="CLOSE"
            onClick={() => {
              setShowMenu(false);
            }}
            size="1.4rem"
            color="ICON_WHITE"
          />
          {buildLinks()}
        </DropdownContainer>
      )}
      {showSearch && (
        <SearchContainer>
          <SearchClose
            icon="CLOSE"
            onClick={() => {
              setShowSearch(false);
            }}
            size="1.4rem"
            color="ICON_WHITE"
          />
          <SearchBar />
        </SearchContainer>
      )}
    </NavigationWrapper>
  );
};

export default NavMini;
