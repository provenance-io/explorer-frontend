import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as BaseLink, useLocation } from 'react-router-dom';
import { Links, StatsLinks, Path } from 'consts';
// Direct import to prevent import order issues
import SearchBar from '../../SearchBar';
import Sprite from '../../Sprite';
import UserAccount from '../../UserAccount';

const NavigationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: ${({ theme }) => theme.BACKGROUND_DARK};
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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

const SubMenu = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.FONT_NAV};
  opacity: 0.9;
  :hover {
    opacity: 1;
  }
`;

const LogoLink = styled(BaseLink)`
  display: flex;
  align-items: center;
`;
const DropdownContainer = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  padding: 30px 5px 5px 5px;
  width: 100%;
  position: relative;
`;
const SubMenuContainer = styled(DropdownContainer)`
  padding: 5px 0 5px 10px;
`;
const SearchContainer = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  width: 100%;
  padding: 30px 10px 10px 0;
  position: relative;
`;
const SearchClose = styled(Sprite)`
  position: absolute;
  right: 0;
  top: 10px;
`;
const CloseIcon = styled(Sprite)`
  position: absolute;
  right: 0;
  top: 30px;
`;

const NavMini = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { pathname } = useLocation();

  const subMenu = () =>
    Object.keys(StatsLinks).map(linkName => {
      const { url, title } = StatsLinks[linkName];
      const active = pathname === url ? 'true' : undefined;
      return (
        <SubMenuContainer key={url} show={showSubMenu}>
          <LinkWrapper key={url}>
            <Link to={url} active={active} onClick={() => setShowMenu(false)}>
              {title}
            </Link>
          </LinkWrapper>
        </SubMenuContainer>
      );
    });

  const buildLinks = () =>
    Object.keys(Links).map(linkName => {
      const { url, title } = Links[linkName];
      const active = pathname === url ? 'true' : undefined;
      if (title !== 'Stats') {
        return (
          <LinkWrapper key={url}>
            <Link to={url} active={active} onClick={() => setShowMenu(false)}>
              {title}
            </Link>
          </LinkWrapper>
        );
      } else {
        return (
          <LinkWrapper key={url}>
            <SubMenu key={url} onClick={() => setShowSubMenu(!showSubMenu)}>
              {title}
              {subMenu()}
            </SubMenu>
          </LinkWrapper>
        );
      }
    });

  const toggleMenu = () => {
    showMenu ? setShowMenu(false) : openDropdown('menu');
  };
  const toggleSearch = () => {
    showSearch ? setShowSearch(false) : openDropdown('search');
  };
  const openDropdown = type => {
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
      <InnerWrapper>
        <Sprite
          icon="MENU"
          onClick={toggleMenu}
          size="3.0rem"
          color={showMenu ? 'ICON_PRIMARY' : 'ICON_WHITE'}
        />
        <LogoLink to={Path.HOME_URL} title="Provenance Blockchain Explorer | Home">
          <Sprite icon="LOGO" height="32px" />
        </LogoLink>
        <Sprite
          icon="SEARCH"
          onClick={toggleSearch}
          size="3.0rem"
          color={showSearch ? 'ICON_PRIMARY' : 'ICON_WHITE'}
        />
      </InnerWrapper>

      <DropdownContainer show={showMenu}>
        <CloseIcon
          icon="CLOSE"
          onClick={() => {
            setShowMenu(false);
          }}
          size="1.4rem"
          color="ICON_WHITE"
        />
        {buildLinks()}
        <UserAccount isMobile />
      </DropdownContainer>

      <SearchContainer show={showSearch}>
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
    </NavigationWrapper>
  );
};

export default NavMini;
