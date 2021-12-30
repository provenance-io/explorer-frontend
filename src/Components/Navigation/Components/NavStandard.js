import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Link as BaseLink, useLocation } from 'react-router-dom';
import { Links, Path, breakpoints } from 'consts';
import { useApp, useColorScheme } from 'redux/hooks';
// Direct import to prevent import order issues
// import { setConstantValue } from 'typescript';
import Sprite from '../../Sprite';
import SearchBar from '../../SearchBar';
import Toggle from '../../Toggle';
import UserAccount from '../../UserAccount';
// import { findLastIndex } from 'cypress/types/lodash';

const NavigationWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  padding: 10px 10%;
  background: ${({ theme }) => theme.BACKGROUND_NAV};
  @media ${breakpoints.down('lg')} {
    padding: 10px 20px;
  }
`;

const NavSection = styled.div`
  flex-basis: ${({ size }) => size || 'auto'};
  margin: 0 10px;
  :first-child {
    margin: 0 10px 0 0;
  }
  :last-child {
    margin: 0 0 0 10px;
  }
`;

const NavSectionUL = styled.ul`
  list-style: none;
  display: flex;
  :last-child {
    margin: 0 20px 0 0;
  }
`;

const NavSectionLI = styled.li`
  position: relative;
  margin-right: 10px;
  width: 100%;
  text-align: left;
  margin-left: 10px;
`;

const DropdownUL = styled.ul`
  position: absolute;
  max-height: 0;
  overflow: hidden;
  transition-delay: 300ms;
  flex-direction: column;
  margin-top: 40px;
  list-style: none;
  margin-left: -45px;
  ${NavSectionLI}:hover & {
    max-height: 150px;
    transition-delay: 500ms;
  }
`;

const Link = styled(BaseLink)`
  background: ${({ theme }) => theme.BACKGROUND_NAV};
  font-size: 1.4rem;
  padding-bottom: 0px;
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
    border-bottom: 2px solid ${theme.FONT_NAV};
    `}
  :first-child {
    margin: 0 10px 0 0;
  }
  :last-child {
    margin: 0 0 0 10px;
  }
  &&& {
    color: ${({ theme }) => theme.FONT_NAV};
  }
`;

const LogoLink = styled(BaseLink)`
  display: flex;
  align-items: center;
`;

const DropSprite = styled(Sprite)`
  position: absolute;
  flex-direction: column;
  margin: 8px 0 0 48%;
  transition-delay: 300ms;
  transition-duration: 300ms;
  ${NavSectionLI}:hover & {
    transition-delay: 300ms;
    transition-duration: 300ms;
    transform: rotate(450deg);
  }
`;

const subMenuTop = { display: 'flex', borderBottom: '0px', paddingRight: '0px' };

const subMenuDrop = { padding: '3px 0 3px 7px', ...subMenuTop };

const NavStandard = () => {
  const { setTheme } = useApp();
  const { themeName } = useColorScheme();
  const { pathname } = useLocation();
  const theme = useTheme();

  const buildLink = (linkName, { url, title, subMenu = {} }, style) => {
    const active = pathname === url ? 'true' : undefined;
    const isSubMenu = Links[linkName]?.subMenu;
    return (
      <NavSectionLI key={url}>
        <Link
          key={url}
          to={isSubMenu ? '#' : url}
          active={active}
          data-testid={`${title.toLowerCase()}-navlink`}
          style={isSubMenu ? subMenuTop : style}
        >
          {title}
          {isSubMenu ? <DropSprite icon="CHEVRON" height="10px" spin={270} /> : null}
          <DropdownUL>
            {Object.keys(subMenu).map(subName =>
              buildLink(subName, Links[linkName].subMenu[subName], subMenuDrop)
            )}
          </DropdownUL>
        </Link>
      </NavSectionLI>
    );
  };

  const buildLinks = () => Object.keys(Links).map(linkName => buildLink(linkName, Links[linkName]));

  return (
    <NavigationWrapper>
      <NavSection>
        <LogoLink to={Path.HOME_URL} title="Provenance Blockchain Explorer | Home">
          <Sprite icon="LOGO" height="32px" />
        </LogoLink>
      </NavSection>
      <NavSection>
        <NavSectionUL>{buildLinks()}</NavSectionUL>
      </NavSection>
      <SearchBar />
      <UserAccount />
      <Toggle
        active={themeName === 'night'}
        optionA={{
          title: 'Night Mode',
          icon: 'MOON',
          iconColor: theme.YELLOW_LIGHTEST,
          action: () => {
            setTheme('default');
          },
        }}
        optionB={{
          title: 'Day Mode',
          icon: 'SUN',
          iconColor: theme.ORANGE_LIGHTEST,
          action: () => {
            setTheme('night');
          },
        }}
        special={{
          active: themeName === 'rainbow',
          title: 'Rainbow Mode',
          icon: 'RAINBOW',
          count: 10,
          action: () => {
            setTheme('rainbow');
          },
        }}
      />
    </NavigationWrapper>
  );
};

export default NavStandard;
