import React from 'react';
import { useHistory } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { breakpoints, ICON_NAMES } from 'consts';
import Button from '../Button';
import Sprite from '../Sprite';

const Container = styled.div`
  position: relative;
`;

const AnnouncementBtn = styled(Button)`
  border: none;
  background: none;
  @media ${breakpoints.up('md')} {
    margin-left: 5px;
  }
`;

interface AnnouncementProps {
  onClick?: () => void;
}

const AnnouncementMenu = ({
  onClick,
}: AnnouncementProps) => {
  const theme = useTheme();
  // Logic for onClick
  const history = useHistory();
  const routeChange = () => {
    const path = `/announcements`;
    history.push(path);
    if (onClick) {
      onClick();
    };
  };

  return (
    <Container>
      <AnnouncementBtn onClick={routeChange}>
        <Sprite
          icon={ICON_NAMES.HELP}
          color={theme.FONT_NAV}
          size="20px"
        />
      </AnnouncementBtn>
    </Container>
  );
};

export default AnnouncementMenu;