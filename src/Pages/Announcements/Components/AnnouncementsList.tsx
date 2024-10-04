import React, { useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Content, Loading, InfiniteScroll } from 'Components';
import { useNotifications, useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const InfoText = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.FONT_PRIMARY};
  margin: 40px 0;
  flex-basis: 100%;
  text-align: center;
`;

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
`;

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
    allAnnouncements,
    allAnnouncementsLoading,
    allAnnouncementsPages,
    getAnnouncementsAll,
  } = useNotifications();

  const loadAnnouncements = useCallback(
    page => {
      getAnnouncementsAll({ 
        fromDate: '',
        page,
        count: 30, });
      },
    [getAnnouncementsAll]
  );

  useEffect(() => {
    loadAnnouncements(1);
  }, [loadAnnouncements]);

  const getAnnouncementsList = () => {
    if (allAnnouncementsLoading) {
      return <Loading />
    }
    else {
      return (
        allAnnouncements.map((item: ItemProps) => {
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
    <>
      {!allAnnouncementsLoading && allAnnouncements.length > 0 ? (
        <Content>
          {/* @ts-ignore */}
          <InfiniteScroll 
            loading={allAnnouncementsLoading} 
            onLoadMore={loadAnnouncements} 
            totalPages={allAnnouncementsPages}
          >
            {({ sentryRef, hasNextPage }) => (
              <>
                {getAnnouncementsList()}
                {(hasNextPage || allAnnouncementsLoading) && <Loading ref={sentryRef} />}
              </>
            )}
          </InfiniteScroll>
        </Content>
      ) : (
        allAnnouncementsLoading ? (
          <Loading />
         ) : (
          <TextWrapper>
            <InfoText>
              {`
                There aren't any announcements yet, but check back soon!
              `}
            </InfoText>
          </TextWrapper>
         )
      )

      }
    </>
  );
};

export default AnnouncementsList;
