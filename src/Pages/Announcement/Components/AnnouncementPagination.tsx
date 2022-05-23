import React from 'react';
import styled from 'styled-components';
import { Sprite } from 'Components';
import { useHistory, useParams } from 'react-router-dom';

const BlockPaginationContainer = styled.div`
  display: flex;
`;
const PaginationButton = styled.div<{ disabled: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  ${({ disabled }) => disabled && 'cursor: not-allowed;'}
`;
const PaginationValue = styled.div`
  user-select: none;
  margin: 0 10px;
`;

interface ParamsProps {
  announcementId: string;
};

interface AnnouncementProps {
  prev: string;
  post: string;
}

export const AnnouncementPagination = ({
  prev,
  post,
}: AnnouncementProps) => {
  const { announcementId: pageAnnounceNum } = useParams<ParamsProps>();

  const history = useHistory();
  const forwardAllowed = post;
  const backAllowed = prev;

  const handleClick = (direction: string) => {
    const nextAnnouncement = direction === 'back' ? prev : post;
    history.push(`/block/${nextAnnouncement}`);
  };

  return (
    <BlockPaginationContainer>
      <PaginationButton disabled={!backAllowed} onClick={() => backAllowed && handleClick('back')}>
        <Sprite icon="CHEVRON" size="1.3rem" color={backAllowed ? 'ICON_PRIMARY' : 'ICON_DISABLED'} />
      </PaginationButton>
      <PaginationValue>{pageAnnounceNum}</PaginationValue>
      <PaginationButton disabled={!forwardAllowed} onClick={() => forwardAllowed && handleClick('forward')}>
        <Sprite icon="CHEVRON" size="1.3rem" spin="180" color={forwardAllowed ? 'ICON_PRIMARY' : 'ICON_DISABLED'} />
      </PaginationButton>
    </BlockPaginationContainer>
  );
};
