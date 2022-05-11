import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Content, Loading } from 'Components';
import { useNotifications, useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  border-radius: 4px;
  color: ${({ theme }) => theme.BUTTON_PRIMARY_FONT};
  background: ${({ theme }) => theme.BUTTON_PRIMARY};
  padding: 20px;
  margin: 10px;
  :first-child {
    margin-top: 20px;
  }
  &:focus {
    background: ${({ theme }) => theme.BUTTON_PRIMARY_FOCUS};
    border-color: ${({ theme }) => theme.BUTTON_PRIMARY_FOCUS};
  }
  &:hover {
    background: ${({ theme }) => theme.BUTTON_PRIMARY_HOVER};
    border-color: ${({ theme }) => theme.BUTTON_PRIMARY_FOCUS};
  }
  &:active {
    background: ${({ theme }) => theme.BUTTON_PRIMARY_ACTIVE};
    border-color: ${({ theme }) => theme.BUTTON_PRIMARY_FOCUS};
  }
`;

const ButtonContent = styled.div`
  display: flex;
  font-size: 1.4rem;
`;

const ButtonNum = styled.div`
  align-self: center;
`;

const ButtonTitle = styled.div`
  margin: 10px;
  text-align: left;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
`;

const ButtonDate = styled.div`
  margin: 10px;
  margin-left: auto;
s`;

interface ItemProps {
  title: string;
  id: number;
  body: string;
  timestamp: string;
}

const AnnouncementsList = () => {
  const { matches: isMed } = useMediaQuery(breakpoints.down('md'));
  // Logic for onClick
  const history = useHistory();
  const routeChange = (id: number) => {
    const path = `/announcement/${id}`;
    history.push(path);
  };

  const {
    openAnnouncements,
    openAnnouncementsLoading,
    getAnnouncementNotifications,
  } = useNotifications();

  useEffect(() => {
    getAnnouncementNotifications({ fromDate: '' });
  }, [getAnnouncementNotifications]);

  const getAnnouncementsList = () => {
    if (openAnnouncementsLoading) {
      return <Loading />
    }
    else {
      return (
        openAnnouncements.reverse().map((item: ItemProps) => {
          const title = item.title;
          const id = item.id;
          const time = item.timestamp.slice(0,10);
          const children = (
            <ButtonContent>
              <ButtonNum>{`${id}.`}</ButtonNum>
              <ButtonTitle>{title}</ButtonTitle>
              <ButtonDate>
                {isMed ? '' : time}
              </ButtonDate>
            </ButtonContent>
          );
          return (
              <Button key={id} onClick={() => routeChange(id)}>{children}</Button>
          );
        })
      );
    };
  };

  return (
    <Content>
      {getAnnouncementsList()}
    </Content>
  );
};

export default AnnouncementsList;
