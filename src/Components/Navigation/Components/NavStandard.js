import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { Path } from '../../../consts';
import { useApp, useColorScheme } from '../../../redux/hooks';
// Direct import to prevent import order issues
import Sprite from '../../Sprite';
import SearchBar from '../../SearchBar';
import Toggle from '../../Toggle';
import UserAccount from '../../UserAccount';
import AnnouncementMenu from '../../AnnouncementMenu';
import NavHeaders from './NavHeaders';

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.BACKGROUND_NAV};
`;

const NavStandard = () => {
  const { setTheme } = useApp();
  const { themeName } = useColorScheme();
  const theme = useTheme();

  return (
    <>
      <NavigationWrapper>
        <Link to={Path.HOME_URL} title="Provenance Blockchain Explorer | Home">
          <Sprite icon="LOGO" height="32px" />
        </Link>
        <SearchBar />
        <AnnouncementMenu />
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
      <NavHeaders />
    </>
  );
};

export default NavStandard;
