import React, { useState } from 'react';
import styled from 'styled-components';
import { DataCard as BaseDataCard } from 'Components';
import { capitalize } from 'utils';
import { NotifyMessage, NotifyMessageProps } from '.';

const DataCard = styled(BaseDataCard)<{ show: boolean }>`
  display: ${({ show }) => show ? '' : 'none'};
`;

interface BannerProps {
  NotifyProps: NotifyMessageProps;
  onClick: () => void;
}

const Banner = ({
  NotifyProps,
  onClick,
}: BannerProps) => {
  const [showNotify, setShowNotify] = useState(true);

  const handleClose = () => {
    setShowNotify(!showNotify);
    onClick();
  }

  return (
    <DataCard
      width="100%"
      title={`${capitalize(NotifyProps.type)}s`}
      handleClose={handleClose}
      icon={NotifyProps.type === 'proposal' ? "REPORTS" : NotifyProps.type === 'upgrade' ? "UPGRADE" : "PROVENANCE"}
      iconColor="FONT_NAV"
      show={showNotify}
      titleMargin='0 0 10px 0'
      titleSize='1.8rem'
    >
      <NotifyMessage {...NotifyProps}/>
    </DataCard>
  );
};

export default Banner;