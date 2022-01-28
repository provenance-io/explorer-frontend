import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Table } from 'Components';
import { useStats } from 'redux/hooks';

const UpgradesListContainer = styled.div`
  width: 100%;
`;

const Upgrades = () => {
  const {
    upgradeInfo: tableData,
    getUpgradeInfo: getTableData,
    upgradeInfoLoading: tableLoading,
  } = useStats();

  // Initial Fetch of upgrades
  useEffect(() => {
    getTableData();
  }, [getTableData]);

  // Only display skipped notes if something is skipped
  const skipped = tableData.find(v => v.skipped) ? 'skipped' : '';

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Upgrade Height', dataName: 'upgradeHeight' },
    { displayName: 'Upgrade Name', dataName: 'upgradeName' },
    { displayName: 'Recommended Version', dataName: 'currentVersion' },
    { displayName: 'Events', dataName: 'events' },
  ];

  return (
    <UpgradesListContainer>
      <Table
        tableHeaders={tableHeaders}
        tableData={tableData}
        isLoading={tableLoading}
        title="Version History"
        notes={skipped}
      />
    </UpgradesListContainer>
  );
};

export default Upgrades;
