import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Link as BaseLink, useLocation } from 'react-router-dom';
import { Links, Path, breakpoints } from 'consts';
import { useApp } from 'redux/hooks';
// Direct import to prevent import order issues
import Sprite from '../../Sprite';
import SearchBar from '../../SearchBar';
import Toggle from '../../Toggle';
import UserAccount from '../../UserAccount';

const NavigationWrapper = styled.div`
  position: fixed;
  display: flex;
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
  margin: 0 10px;
  :first-child {
    margin: 0 10px 0 0;
  }
  :last-child {
    margin: 0 0 0 10px;
  }
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
  margin-right: 60px;
`;

const NavStandard = () => {
  const { setTheme, theme: themeName } = useApp();
  const { pathname } = useLocation();
  const theme = useTheme();

  const buildLinks = () =>
    Object.keys(Links).map((linkName) => {
      const { url, title } = Links[linkName];
      const active = pathname === url ? 'true' : undefined;
      return (
        <Link key={url} to={url} active={active}>
          {title}
        </Link>
      );
    });

  return (
    <NavigationWrapper>
      <NavSection>
        <LogoLink to={Path.HOME_URL} title="Provenance Explorer | Home">
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
