import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Link as BaseLink, useLocation } from 'react-router-dom';
import { Links, Path, breakpoints } from 'consts';
import { useApp, useColorScheme } from 'redux/hooks';
// Direct import to prevent import order issues
import Sprite from '../../Sprite';
import SearchBar from '../../SearchBar';
import Toggle from '../../Toggle';
import UserAccount from '../../UserAccount';

const NavigationWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  padding: 15px 15px;
  background: ${({ theme }) => theme.BACKGROUND_NAV};
  @media ${breakpoints.down('lg')} {
    padding: 10px 15px;
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
  margin-left: ${({ $subDrop }) => ($subDrop ? '0px' : '10px')};
`;

const DropdownUL = styled.ul`
  position: absolute;
  max-height: 0;
  overflow: hidden;
  white-space: nowrap;
  transition-delay: 300ms;
  flex-direction: column;
  list-style: none;
  margin-left: -5px;
  padding: 20px 0 0 0;
  @media ${breakpoints.down('lg')} {
    padding: 14px 0 0 0;
  }
  ${NavSectionLI}:hover & {
    max-height: 150px;
    transition-delay: 500ms;
  }
`;

const Link = styled(BaseLink)`
  display: flex;
  background: ${({ theme }) => theme.BACKGROUND_NAV};
  font-size: 1.4rem;
  opacity: 0.9;
  border-bottom: ${({ theme }) => `2px solid ${theme.BACKGROUND_NAV};`};
  :hover {
    opacity: 1;
  }
  :visited {
    color: ${({ theme }) => theme.FONT_NAV_VISITED};
  }
  ${({ $active, theme, $subDrop }) =>
    $active &&
    `
    opacity: 1;
    font-weight: ${theme.FONT_WEIGHT_BOLDEST};
    border-bottom: ${$subDrop ? '0px' : `2px solid ${theme.FONT_NAV}`};
    `}
  :first-child {
    margin: 0 10px 0 0;
  }
  :last-child {
    margin: 0 0 0 0px;
  }
  &&& {
    color: ${({ theme }) => theme.FONT_NAV};
    ${({ $subDrop, theme }) =>
      $subDrop &&
      `
      :hover {
        color: ${theme.FONT_LINK};
      }
    `}
  }
  padding: ${({ $subDrop }) => $subDrop && '3px 7px 3px 7px;'};
`;

const LogoLink = styled(BaseLink)`
  display: flex;
  align-items: center;
`;

const DropSprite = styled(Sprite)`
  position: absolute;
  display: flex;
  margin: -19px 0 0 47%;
  transition-delay: 300ms;
  transition-duration: 300ms;
  ${NavSectionLI}:hover & {
    transition-delay: 300ms;
    transition-duration: 300ms;
    transform: rotate(450deg);
  }
`;

const NavStandard = () => {
  const { setTheme } = useApp();
  const { themeName } = useColorScheme();
  const { pathname } = useLocation();
  const theme = useTheme();

  const buildLink = (linkName, { url, title, subMenu = {} }, subDrop) => {
    const active = pathname === url;
    const isSubMenu = Links[linkName]?.subMenu || undefined;
    return (
      <NavSectionLI key={url} $subDrop={subDrop}>
        <Link
          key={url}
          to={isSubMenu ? '#' : url}
          $active={active}
          $subDrop={subDrop}
          data-testid={`${title.toLowerCase()}-navlink`}
        >
          {title}
        </Link>
        {isSubMenu && (
          <>
            <DropSprite icon="CHEVRON" height="10px" spin={270} />
            <DropdownUL>
              {Object.keys(subMenu).map(subName =>
                buildLink(subName, Links[linkName].subMenu[subName], true)
              )}
            </DropdownUL>
          </>
        )}
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
