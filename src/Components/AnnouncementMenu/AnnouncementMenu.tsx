import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { breakpoints, ICON_NAMES } from 'consts';
import { useApp, useMediaQuery } from 'redux/hooks';
import { PopupNote } from 'Components/PopupNote';
import Button from '../Button';
import Sprite from '../Sprite';

const Container = styled.div`
  position: relative;
`;

const AnnouncementBtn = styled(Button)<{ notify: boolean }>`
  border: none;
  background: ${({ notify, theme }) => (notify ? theme.BACKGROUND_THEME : 'none')};
  @media ${breakpoints.up('md')} {
    margin-left: 5px;
  }
`;

interface AnnouncementProps {
  onClick?: () => void;
}

const AnnouncementMenu = ({ onClick }: AnnouncementProps) => {
  const [visible, setVisible] = useState(false);
  const { announcementNotifications } = useApp();
  const [notify, setNotify] = useState(false);
  const theme = useTheme();
  const { matches: isSmall } = useMediaQuery(breakpoints.down('md'));

  // Logic for onClick
  const history = useHistory();
  const routeChange = () => {
    const path = `/announcements`;
    history.push(path);
    setNotify(false);
    if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    if (announcementNotifications) {
      setNotify(true);
    }
  }, [setNotify, announcementNotifications]);

  const position = isSmall ? 'above' : 'left';

  return (
    <Container onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <PopupNote show={visible} position={position} zIndex="202">
        Announcements
      </PopupNote>
      <AnnouncementBtn onClick={routeChange} notify={notify}>
        <Sprite icon={ICON_NAMES.MEGAPHONE} color={theme.FONT_NAV} size="20px" />
      </AnnouncementBtn>
    </Container>
  );
};

export default AnnouncementMenu;
