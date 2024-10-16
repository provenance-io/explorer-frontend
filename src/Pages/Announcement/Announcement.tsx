import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Wrapper, Header, Section, Loading } from '../../Components';
import { useNotifications } from '../../redux/hooks';
import { isEmpty } from '../../utils';
import { AnnouncementPagination } from './Components';

const Title = styled.div`
  padding-top: 20px;
  font-size: 1.875rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  align-self: center;
`;
const Date = styled.div`
  font-size: 0.875rem;
`;

interface ParamsProps {
  announcementId: string;
}

const Announcement = () => {
  const { announcementInfo, announcementInfoLoading, getAnnouncementInfo } = useNotifications();
  const { announcementId } = useParams<ParamsProps>();

  useEffect(() => {
    getAnnouncementInfo({id: announcementId});
  }, [getAnnouncementInfo, announcementId]);

  const { title, id, timestamp, body, nextId, prevId } = announcementInfo;

  return (
    <Wrapper>
      <Header
        title={`Announcement ${id}`}
      >
        <AnnouncementPagination nextId={nextId} prevId={prevId}/>
      </Header>
      {announcementInfoLoading || isEmpty(announcementInfo) ? <Loading /> :
      <>
        <Section header>
          {/* @ts-ignore */}
          <Title>{title}</Title>
        </Section>
        <Date>{`Posted on ${timestamp.slice(0,10)}`}</Date>
        <ReactMarkdown>
          {body}
        </ReactMarkdown>
      </>
      }
    </Wrapper>
  );
};

export default Announcement;
