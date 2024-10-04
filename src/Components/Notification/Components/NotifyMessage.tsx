import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link as BaseLink } from 'react-router-dom';
import { useMediaQuery } from '../../../redux/hooks';
import { capitalize } from '../../../utils';
import { breakpoints } from '../../../consts';

const Message = styled.div`
  font-size: 1.4rem;
  @media ${breakpoints.down('md')} {
    min-width: 300px;
  }
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  color: ${({ theme }) => theme.FONT_NAV};
  padding-top: 5px;
`;

const List = styled.li`
`;

const UList = styled.ul`
  margin-bottom: 0;
  @media ${breakpoints.down('sm')} {
    margin: 0;
  }
`;

const Bold = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.YELLOW_LIGHTEST};
`;

const Link = styled(BaseLink)`
  color: ${({ theme }) => theme.FONT_PRIMARY}; 
  font-size: 1.4rem;
  &&& {
    :hover {
      opacity: 1;
      text-decoration: underline;
    }
    :visited {
      color: ${({ theme }) => theme.FONT_NAV};
    }

    color: ${({ theme }) => theme.FONT_NAV};
  }
`;

interface DataProps {
  body?: string;
  timestamp?: string;
  id: number;
  title: string;
  isUpgrade?: boolean;
}

export type NotifyMessageProps = {
  data: DataProps[];
  type: string;
}

export const NotifyMessage = ({
  data,
  type,
}: NotifyMessageProps) => {
  const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));
  let link = "";
  let message = "";

  switch (type) {
    case 'proposal':
      link = '/proposal/';
      message = `${data.length > 1 ? 'Multiple proposals are ' : 'A proposal is '}
        now active! Visit the proposal page to review, deposit and/or vote.`;
      break;
    case 'upgrade':
      link = '/network/upgrades';
      message = `${data.length > 1 ? 'Multiple upgrades ' : 'An upgrade '}
      is scheduled! Visit the upgrades page to learn more about what new
      features are heading to Provenance.`;
      break;
    default:
      link = '/announcement/';
      message = `${data.length > 1 ? 'We have some new announcements! ' : 'We have an announcement! '}
      Click on the below link${data.length > 1 ? 's' : ''} to see what's in store for the Provenance community.`;
      break;
  };

  const getMessage = (data: DataProps[], type: string) => (
    data.map(item => {
      const title = item.title;
      const id = item.id;
      const softwareUpgrade = item.isUpgrade ? 'SOFTWARE UPGRADE - ' : '';
      return (
        <List key={id}>
          <Link 
            to={type === 'upgrade' ? link : `${link}${id}`} 
          >
            {softwareUpgrade ?
              <Bold>{`${softwareUpgrade} PROPOSAL ${id}: ${title}`}</Bold> :
              isSmall ? title : `${capitalize(type)} ${id}: ${title}`
            }
          </Link>
        </List>
      );
    })
  );

  return (
    <>
    {!isSmall &&
      <Message>
        {message}
      </Message>
    }
    <UList>
      {getMessage(data, type)}
    </UList>
    </>
  );
};