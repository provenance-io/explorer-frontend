import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { format } from 'date-fns';
import { Content, Button as BaseButton } from 'Components';
import { useNotifications, useInterval, useApp } from 'redux/hooks';
import { polling } from 'consts';
import { subtractDays } from 'utils';
import { Banner } from './Components';

const NotificationWrapper = styled.div<{ show: boolean }>`
  display: ${({ show }) => show ? '' : 'none'};
  width: 100%;
  margin-bottom: 20px;
`;

const Button = styled(BaseButton)`
  margin-left: auto;
  border: 1px solid white;
  :hover {
    cursor: pointer;
  }
`;

const Notification = () => {
  const theme = useTheme();
  const { 
    setProposalNotifications, 
    proposalNotifications,
    setUpgradeNotifications,
    upgradeNotifications,
    setAnnouncementNotifications,
    announcementNotifications,
  } = useApp();
  const {
    openProposals,
    openAnnouncements,
    scheduledUpgrades,
    getProposalNotifications,
    getUpgradeNotifications,
    getAnnouncementNotifications,
  } = useNotifications();

  // Calculate days to grab announcements from the past week
  const today = new Date();
  const dateFormat = 'yyyy-MM-dd';
  const fromDate = format(subtractDays(today, 7), dateFormat);

  useEffect(() => {
    getProposalNotifications();
    getUpgradeNotifications();
    getAnnouncementNotifications({ fromDate });
  }, [getProposalNotifications, getUpgradeNotifications, getAnnouncementNotifications, fromDate]);

  const [showNotifications, setShowNotifications] = useState(
    proposalNotifications || upgradeNotifications || announcementNotifications
  );

  // Poll for updates every 15 minutes (prod, test is every 1 min)
  useInterval(() => {
    getProposalNotifications();
    getUpgradeNotifications();
    getAnnouncementNotifications({ fromDate });
    checkNotifications(openProposals, 'proposal', setProposalNotifications);
    checkNotifications(scheduledUpgrades, 'upgrade', setUpgradeNotifications);
    checkNotifications(openAnnouncements, 'announcement', setAnnouncementNotifications);
  }, polling.notifications);

  const handleCloseProposal = () => {
    setProposalNotifications(false);
    if (!upgradeNotifications && !announcementNotifications) {
      setShowNotifications(false);
    };
  };

  const handleCloseUpgrades = () => {
    setUpgradeNotifications(false);
    if (!proposalNotifications && !announcementNotifications) {
      setShowNotifications(false);
    };
  };

  const handleCloseAnnouncement = () => {
    setAnnouncementNotifications(false);
    if (!upgradeNotifications && !proposalNotifications) {
      setShowNotifications(false);
    };
  };

  const handleCloseAll = () => {
    handleCloseProposal();
    handleCloseUpgrades();
    handleCloseAnnouncement();
    setShowNotifications(!showNotifications);
  };

  interface DataProps {
    id: number;
    title: string;
    body?: string;
    timestamp?: string;
  }

  type TypeProps = 'proposal' | 'upgrade' | 'announcement';

  type StateProps = (arg: boolean) => void;

  const checkNotifications = (
    data: DataProps[],
    type: TypeProps, 
    state: StateProps,
    ) => {
    // First, get whatever is saved for proposal Notifications
    const currentString = localStorage.getItem(type+'Notifications');
    // Change to an object
    const currentObj = currentString ? JSON.parse(currentString) : {};
    // Iterate through the current data
    data.forEach(item => {
      // If the current data doesn't have a value in local storage object
      // that means we have a new item and should open notifications
      if (!currentObj[item.id]) {
        // Set the item state
        state(true);
        // Show notifications
        setShowNotifications(true);
        // Add item to currentObj so we don't reshow it later
        currentObj[item.id] = 'set for '+type+' '+item.title;
      };
    });
    // Add updated object back to local storage
    localStorage.setItem(type+'Notifications',JSON.stringify(currentObj));
  };

  checkNotifications(openProposals, 'proposal', setProposalNotifications);
  checkNotifications(scheduledUpgrades, 'upgrade', setUpgradeNotifications);
  checkNotifications(openAnnouncements, 'announcement', setAnnouncementNotifications);

  const getNotifications = (
    data: DataProps[], 
    type: TypeProps, 
    onClick: () => void,
    ) => (
    <Banner 
      onClick={onClick}
      NotifyProps={{
        data, 
        type,
      }}
    />
  );

  const closeAnnouncements =
    <Button
      onClick={handleCloseAll}
      color="PRIMARY"
    >
      Close All
    </Button>
  ;

  return (
    <NotificationWrapper 
      show={
        showNotifications &&
        (
          (
            openProposals.length > 0 ||
            scheduledUpgrades.length > 0 ||
            openAnnouncements.length > 0
          ) &&
          (
            proposalNotifications ||
            upgradeNotifications ||
            announcementNotifications
          )
        )
      }
    >
      <Content
        icon="MEGAPHONE"
        iconColor={theme.FONT_NAV}
        title="News and Announcements"
        titleSize="2.0rem"
        background={theme.BACKGROUND_THEME}
        borderRadius="5px"
        // @ts-ignore
        headerContent={closeAnnouncements}
        color={theme.FONT_NAV}
      >
        {openProposals.length > 0 && proposalNotifications &&
          getNotifications(openProposals, 'proposal', handleCloseProposal) as any
        }
        {scheduledUpgrades.length > 0 && upgradeNotifications &&
          getNotifications(scheduledUpgrades, 'upgrade', handleCloseUpgrades) as any
        }
        {openAnnouncements.length > 0 && announcementNotifications &&
          getNotifications(openAnnouncements, 'announcement', handleCloseAnnouncement) as any
        }
      </Content>
    </NotificationWrapper>
  );
};

export default Notification;