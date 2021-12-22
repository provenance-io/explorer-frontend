import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Link as BaseLink, useLocation } from 'react-router-dom';
import { Links, StatsLinks, Path, breakpoints } from 'consts';
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
  padding: 15px 10%;
  background: ${({ theme }) => theme.BACKGROUND_NAV};
  @media ${breakpoints.down('lg')} {
    padding: 10px 20px;
  }
`;

const NavSection = styled.div`
  flex-basis: ${({ size }) => size || 'auto'};
  list-style: none;
  display: flex;
  margin: 0 10px;
  :first-child {
    margin: 0 10px 0 0;
  }
  :last-child {
    margin: 0 0 0 10px;
  }
`;

const Dropdown = styled(NavSection)`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
`;

const Link = styled(BaseLink)`
  margin: 0 10px;
  font-size: 1.4rem;
  padding-bottom: 5px;
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
    margin: 0 10px 0 60px;
  }
  :last-child {
    margin: 0 10px 0 10px;
  }
  &&& {
    color: ${({ theme }) => theme.FONT_NAV};
  }
`;

const DropMenu = styled.div`
  margin: 0 10px;
  font-size: 1.4rem;
  padding-bottom: 5px;
  padding-right: 50px;
  opacity: 0.9;
  :hover {
    opacity: 1;
  }
`;

const DropLink = styled(BaseLink)`
  display: flex;
  background: ${({ theme }) => theme.BACKGROUND_NAV};
  margin: 0 10px;
  font-size: 1.3rem;
  padding: 5px;
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
    text-decoration: underline 2px ${theme.FONT_NAV};
    `}
  &&& {
    color: ${({ theme }) => theme.FONT_NAV};
  }
`;

const LogoLink = styled(BaseLink)`
  display: flex;
  align-items: center;
`;

const NavStandard = () => {
  const [showDrop, setShowDrop] = useState(false);
  const { setTheme } = useApp();
  const { themeName } = useColorScheme();
  const { pathname } = useLocation();
  const theme = useTheme();

  const subMenu = () =>
    Object.keys(StatsLinks).map(linkName => {
      const { url, title } = StatsLinks[linkName];
      const active = pathname === url ? 'true' : undefined;
      return (
        <li key={url}>
          <DropLink
            key={url}
            to={url}
            active={active}
            data-testid={`${title.toLowerCase()}-navlink`}
          >
            {title}
          </DropLink>
        </li>
      );
    });

  const buildLinks = () =>
    Object.keys(Links).map(linkName => {
      const { url, title } = Links[linkName];
      const active = pathname === url ? 'true' : undefined;
      if (title !== 'Stats') {
        return (
          <Link key={url} to={url} active={active} data-testid={`${title.toLowerCase()}-navlink`}>
            {title}
          </Link>
        );
      } else {
        return (
          <DropMenu
            key={url}
            onMouseEnter={() => setShowDrop(!showDrop)}
            onMouseLeave={() => setShowDrop(!showDrop)}
          >
            {title}
            <Dropdown show={showDrop}>{subMenu()}</Dropdown>
          </DropMenu>
        );
      }
    });

  return (
    <NavigationWrapper>
      <NavSection>
        <LogoLink to={Path.HOME_URL} title="Provenance Blockchain Explorer | Home">
          <Sprite icon="LOGO" height="32px" />
        </LogoLink>
      </NavSection>
      <NavSection>{buildLinks()}</NavSection>
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
